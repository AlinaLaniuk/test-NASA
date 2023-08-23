"use client"

import styles from './page.module.css';
import Card from '../../components/card/card';
import { useEffect, useState } from 'react';
import { AsteroidsNearEarthForPeriod, CardInfo, DistanceToEarthKeys } from './types';
import { addToDate, getYYYYMMDDFormat, getInfoForCards } from './dateUtils';
import classNames from 'classnames';

const api_key = 'tA5QzkWoUrrXmdMbPC7GZfXeWcktO13a7mzgRZXG';
const defaultPeriod = 7;

const lunarWordDeclinations = ['лунная орбита', 'лунные орбиты', 'лунных орбит'];

function setLunarWordDeclinations(value: number) {
  const unitDigit = Math.abs(value) % 100;
  const num = unitDigit % 10;
  if (unitDigit > 10 && unitDigit < 20) return lunarWordDeclinations[2];
  if (num > 1 && num < 5) return lunarWordDeclinations[1];
  if (num == 1) return lunarWordDeclinations[0];
  return lunarWordDeclinations[2];
};

const distanceToEarthUnits = {
  kilometers: 'км',
  lunar: setLunarWordDeclinations,
};

export default function Home() {
  const [asteroidsInfo, updateAsteroidsInfo] = useState<CardInfo[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentEndDate, updateCurrentEndDate] = useState(getYYYYMMDDFormat(addToDate(getYYYYMMDDFormat(new Date()), -1)));
  const [distanceToEarthMode, updateDistanceToEarthMode] = useState<DistanceToEarthKeys>('kilometers');

  async function getAsteroidsInfo(startDate: string, endDate: string) {
    const data = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`);
    return data.json();
  }

  function addNewAsteroidInfo() {
    const startDate = getYYYYMMDDFormat(addToDate(currentEndDate, 1));
    const endDate = getYYYYMMDDFormat(addToDate(startDate, defaultPeriod));
    updateCurrentEndDate(endDate);
    getAsteroidsInfo(startDate, endDate).then((data: AsteroidsNearEarthForPeriod) => { updateAsteroidsInfo([...asteroidsInfo, ...getInfoForCards(data.near_earth_objects)]) })
    setFetching(false);
  }

  const scrollHandler = () => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  }

  const distanceToEarthHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = (event.target as HTMLButtonElement).id;
    updateDistanceToEarthMode(buttonId as DistanceToEarthKeys);
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetching) {
      addNewAsteroidInfo();
    };
  }, [fetching])

  return (
    <div className={styles.homeContainer}>
      <div className={styles.asteroidsListContainer}>
        <div className='title'>Ближайшие подлеты астероидов</div>
        <div className={styles.distanceButtonsContainer}>
          <button onClick={distanceToEarthHandler} id='kilometers' className={classNames(styles.distanceButton, 'text', distanceToEarthMode === 'kilometers' && 'textUnderlined')}>в километрах</button>
          <span className='text'> | </span>
          <button onClick={distanceToEarthHandler} id='lunar' className={classNames(styles.distanceButton, 'text', distanceToEarthMode === 'lunar' && 'textUnderlined')}>в лунных орбитах</button>
        </div>
      </div>
      <div className={styles.cartContainer}>
        {
          asteroidsInfo?.map((asteroidInfo) => {
            return <Card
              key={asteroidInfo.name + asteroidInfo.date}
              date={asteroidInfo.date}
              distanceToEarth={asteroidInfo.distanceToEarth[distanceToEarthMode]}
              distanceToEarthUnit={distanceToEarthMode === 'kilometers' ? distanceToEarthUnits.kilometers : distanceToEarthUnits.lunar(asteroidInfo.distanceToEarth[distanceToEarthMode])}
              size={asteroidInfo.size}
              imgSize={asteroidInfo.imgSize}
              dangerous={asteroidInfo.dangerous}
              name={asteroidInfo.name}
            />
          })
        }
      </div>
      <div className='title'>{fetching ? 'Загрузка...' : ''}</div>
    </div>
  )
};
