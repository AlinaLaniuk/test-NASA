import styles from './card.module.css';
import Image from 'next/image';
import classNames from 'classnames';

export type Props = {
  date: string;
  distanceToEarth: number,
  size: number;
  imgSize: number;
  dangerous: boolean;
  name: string;
}

export default function Card({ date, distanceToEarth, size, imgSize, dangerous, name }: Props) {
  return (
    <div className={styles.cardContainer}>
      <div className='subtitle'>{date}</div>
      <div className={classNames(styles.cardMiddle, 'row')}>
        <div className={classNames(styles.distanceBlock, 'column')}>
          <span className='text'>{distanceToEarth} км</span>
          <div className={styles.distanceLine}>
            <Image
              src={'/arrow.svg'}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: 'auto', height: 'auto' }}
              alt='asteroid'
            />
          </div>
        </div>
        <div className={styles.asteroidImgContainer}>
          <Image
            src={'/asteroid.png'}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: 'auto', height: `${imgSize * 100}% ` }}
            alt='asteroid'
          />
        </div>
        <div className={classNames(styles.nameSizeContainer, 'column')}>
          <span className={classNames('text', 'textUnderlined')}>{name}</span>
          <span className='text'>⌀{size}</span>
        </div>
      </div>
      <div className={classNames(styles.cardBottom, 'row')}>
        <button className={classNames(styles.cardButton, 'text')}>заказать</button>
        {dangerous && <div className={classNames('text')}>&#9888; Опасен</div>}
      </div>
    </div>
  )
};