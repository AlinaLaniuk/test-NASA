import styles from './logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
        <span className={styles.logoText}>Armageddon 2023</span> 
        <div className={styles.logoTextContainer}>
          <div className='text'>ООО &quot;Команда им. Б.Уиллиса&quot;</div>
          <div className='text'>Взрываем астероиды с 1998 года.</div>
        </div>   
    </div>
  )
};
