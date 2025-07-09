import { VarietyType } from "@/types/variety";
import { useMemo, useState } from "react";

type VarietyChooserProps = {
    availableVarieties: VarietyType[];
    chosenVarieties: VarietyType[];
    chooseVariety: (variety: VarietyType) => void;
}

export default function VarietyChooser({ availableVarieties, chosenVarieties, chooseVariety }: VarietyChooserProps) {
    const [search, setSearch] = useState<string>("");
    const varietiesWithIsChosen: [VarietyType, boolean][] = availableVarieties
        .map<[VarietyType, boolean]>((variety) => [variety, chosenVarieties.some((v) => v.id === variety.id)])
        .sort((a, b) => a[0].name.localeCompare(b[0].name)); // need to re-sort array afterwards
    
    const filteredVarieties = useMemo(() =>
        varietiesWithIsChosen.filter(([vp]) =>
            vp.name.toLowerCase().includes(search.toLowerCase())
        ), [search, varietiesWithIsChosen]
    );

    return (
        <div>
            <input
            type="text"
            placeholder="Suche nach Rebsorten..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-[var(--color-primary)]"
            />
            <ul className="bg-gray-100 rounded-sm p-2">
                {filteredVarieties.map(([variety, isChosen]) => (
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
        </div>
    )
}