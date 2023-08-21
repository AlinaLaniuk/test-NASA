import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Asteroids App',
  description: 'Monitoring of dangerous asteroids',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.appBackground}>
          <div className={styles.planetaImgContainer}>
            <Image
              src={'/planeta.png'}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: 'auto', height: '100%' }}
              alt='planeta-img' 
            />
          </div>
          {children}
        </div>
        </body>
    </html>
  )
};
