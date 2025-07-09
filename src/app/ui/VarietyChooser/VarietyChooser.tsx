import { VarietyType } from "@/types/variety";

type VarietyChooserProps = {
    availableVarieties: VarietyType[];
    chosenVarieties: VarietyType[];
    chooseVariety: (variety: VarietyType) => void;
}

export default function VarietyChooser({ availableVarieties, chosenVarieties, chooseVariety }: VarietyChooserProps) {
    const varietiesWithIsChosen: [VarietyType, boolean][] = availableVarieties
    .map<[VarietyType, boolean]>((variety) => [variety, chosenVarieties.some((v) => v.id === variety.id)])
    .sort((a, b) => a[0].name.localeCompare(b[0].name)); // need to re-sort array afterwards

    return (
        <ul className="bg-gray-100 rounded-sm p-2">
            {varietiesWithIsChosen.map(([variety, isChosen]) => (
                <li key={variety.id} onClick={() => {
                    if (!isChosen) chooseVariety(variety);
                }} className={`
                p-1 text-sm
                ${isChosen ?
                    'bg-gray-200 text-gray-400 disabled'
                    : 'hover:bg-[var(--color-primary-muted)] cursor-pointer'
                }
                `}>{variety.name}</li>
            ))}
        </ul>
    )
}