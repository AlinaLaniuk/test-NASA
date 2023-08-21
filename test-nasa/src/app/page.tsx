import styles from './page.module.css';
import Cart from './cart/cart';

export default function Home() {
  return (
    <main className={styles.main}>
      Hello
      <Cart />
    </main>
  )
};
