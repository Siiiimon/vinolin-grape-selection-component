import { VarietyType } from '@/types/variety';
import styles from './page.module.css'
import GrapeSelection from './ui/GrapeSelection/GrapeSelection';
import rawVarieties from '@/data/grapeVarieties.json';

export default function Home() {
  const varieties: VarietyType[] = Object.entries(rawVarieties).map(
    ([id, name]) => ({id, name})
  );
  
  return (
    <div className={styles.content}>
      <GrapeSelection varieties={varieties} />
    </div>
  );
}
