"use client"

import styles from './page.module.css';
import Cart from './cart/cart';
import { useEffect, useState } from 'react';

const api_key = 'tA5QzkWoUrrXmdMbPC7GZfXeWcktO13a7mzgRZXG';
const defaultPeriod = 7;

function addToDate(startDate: string, period: number){
  const dateObject = getDateObjectFromString(startDate);
  const newDate = new Date(dateObject.setDate(dateObject.getDate() + period));
  return newDate;
}

function getDateObjectFromString(stringDate: string){
  const parts = stringDate.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const dateObject = new Date(year, month, day);
  return dateObject;
}

function getYYYYMMDDFormat(dateObject: Date) {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

export default function Home() {
  const [asteroidsInfo, updateAsteroidsInfo] = useState();
  const [currentStartDate, updateCurrentStartDate] = useState('');
  const [currentEndDate, updateCurrentEndDate] = useState('');

  async function getAsteroidsInfo(startDate: string, endDate: string){
    const data = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`);
    return data.json();
  }

  useEffect(() => {
    const startDate = getYYYYMMDDFormat(new Date());
    const endDate = getYYYYMMDDFormat(addToDate(startDate, defaultPeriod));
    getAsteroidsInfo(startDate, endDate).then((data) => {console.log(data)})
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

       </div>
    </div>
  )
};
