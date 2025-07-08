type VarietyChooserProps = {
    varieties: string[];
    chooseVariety: (variety: string) => void;
}

export default function VarietyChooser({ varieties, chooseVariety }: VarietyChooserProps) {
    return (
        <ul className="bg-gray-100 rounded-sm p-2">
            {varieties.map(variety => (
                <li key={variety} onClick={() => chooseVariety(variety)} className="
                p-1
                hover:bg-[var(--color-primary-muted)] cursor-pointer
                ">{variety}</li>
            ))}
        </ul>
    )
}