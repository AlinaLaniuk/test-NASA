"use client"

import styles from './page.module.css';
import Card from '../../components/card/card';
import { useEffect, useState } from 'react';
import { AsteroidsNearEarthForPeriod, CardInfo } from './types';
import { addToDate, getYYYYMMDDFormat, getInfoForCards } from './dateUtils';

const api_key = 'tA5QzkWoUrrXmdMbPC7GZfXeWcktO13a7mzgRZXG';
const defaultPeriod = 7;

export default function Home() {
  const [asteroidsInfo, updateAsteroidsInfo] = useState<CardInfo[]>([]);
  const [fetching, setFetching] = useState(true);
  const [currentEndDate, updateCurrentEndDate] = useState(getYYYYMMDDFormat(addToDate(getYYYYMMDDFormat(new Date()), -1)));

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
          <button>в километрах</button>
          <button>в лунных орбитах</button>
        </div>
      </div>
      <div className={styles.cartContainer}>
        {
          asteroidsInfo?.map((asteroidInfo) => {
            return <Card
              key={asteroidInfo.name + asteroidInfo.date}
              date={asteroidInfo.date}
              distanceToEarth={asteroidInfo.distanceToEarth.kilometers}
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
