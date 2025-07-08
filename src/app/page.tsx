import styles from './page.module.css'
import GrapeSelection from './ui/GrapeSelection';

export default function Home() {
  return (
    <div className={styles.content}>
      <GrapeSelection />
    </div>
  );
}
