import styles from './card.module.css';
import Image from 'next/image';

type Props = {
  date: string;
  distanceToEarth: string;
  size: string;
  imgSize: string;
  dangerous: boolean;
  name: string;
}

export default function Card({date, distanceToEarth, size, imgSize, dangerous, name}: Props) {
  return (
    <div className={styles.cardContainer}>
       <div className={styles.cardTop}>{date}</div>
       <div className={styles.cardMiddle}>
        <div className={styles.distanceBlock}>
          <span>`${distanceToEarth} км`</span>
          <div className={styles.distanceLine}></div>
        </div>
        <div className={styles.asteroidImgContainer}>
          <Image
            src={'/asteroid.png'}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: 'auto', height: '100%' }}
            alt='asteroid' 
          />
        </div>
        <div className={styles.nameSizeContainer}>
          <span>{name}</span>
          <span>`⌀${size}`</span>
        </div>
       </div>
       <div className={styles.cardBottom}>
        <button>заказать</button>
        {dangerous && <div>&#9888; Опасен</div>}
       </div>
    </div>
  )
};