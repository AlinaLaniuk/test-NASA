import styles from './page.module.css';
import Cart from './cart/cart';

export default function Home() {
  return (
    <div className={styles.main}>
      Hello
      <Cart />
    </div>
  )
};
