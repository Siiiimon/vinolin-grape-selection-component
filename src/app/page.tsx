import { VarietyType } from '@/types/variety';
import GrapeSelection from './ui/GrapeSelection/GrapeSelection';
import rawVarieties from '@/data/grapeVarieties.json';

export default function Home() {
  const varieties: VarietyType[] = Object.entries(rawVarieties).map(
    ([id, name]) => ({id, name})
  );
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-700">
      <GrapeSelection varieties={varieties} />
    </div>
  );
}
