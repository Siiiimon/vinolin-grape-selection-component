import type { VarietyWithPercentageType } from "@/types/variety";

type VarietyProps = {
    variety: VarietyWithPercentageType;
    remove: (variety: VarietyWithPercentageType) => void;
}

export default function Variety({ variety, remove }: VarietyProps) {
    return (
        <div className="flex justify-between">
            <h3>{variety.variety.name}</h3>
            <button
                onClick={() => remove(variety)}
                aria-label={`Remove ${variety.variety.name} from selection`}
                className="cursor-pointer"
            >-</button>
        </div>
    )
}