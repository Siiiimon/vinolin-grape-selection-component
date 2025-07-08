import type { Variety } from "@/types/variety";

type VarietyProps = {
    variety: Variety;
    remove: (variety: Variety) => void;
}

export default function Variety({ variety, remove }: VarietyProps) {
    return (
        <div className="flex justify-between">
            <h3>{variety.name}</h3>
            <button
                onClick={() => remove(variety)}
                aria-label={`Remove ${variety.name} from selection`}
                className="cursor-pointer"
            >-</button>
        </div>
    )
}