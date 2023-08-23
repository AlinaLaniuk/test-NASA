"use client"

import styles from './page.module.css';
import Card from '../../components/card/card';
import { useEffect, useState } from 'react';
import { AsteroidsNearEarthForPeriod, CardInfo } from './types';
import { addToDate, getYYYYMMDDFormat, getInfoForCards } from './dateUtils';

const api_key = 'tA5QzkWoUrrXmdMbPC7GZfXeWcktO13a7mzgRZXG';
const defaultPeriod = 7;

export default function Home() {
  const [asteroidsInfo, updateAsteroidsInfo] = useState<CardInfo[]>();
  const [currentStartDate, updateCurrentStartDate] = useState('');
  const [currentEndDate, updateCurrentEndDate] = useState('');

  async function getAsteroidsInfo(startDate: string, endDate: string) {
    const data = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`);
    return data.json();
  }

  useEffect(() => {
    const startDate = getYYYYMMDDFormat(new Date());
    const endDate = getYYYYMMDDFormat(addToDate(startDate, defaultPeriod));
    getAsteroidsInfo(startDate, endDate).then((data: AsteroidsNearEarthForPeriod) => { updateAsteroidsInfo(getInfoForCards(data.near_earth_objects)) })
  }, [])

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
    </div>
  )
};
