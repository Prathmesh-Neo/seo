import styles from '@/styles/Button.module.scss'
import '@/styles/font.scss'
export default function Home() {

  return (
    <>
       
      <h1 id="demo" className='font'> This is home page</h1>

      <button className={styles.button}>Click me</button>

    </>
  );
}
