import type { VarietyWithPercentageType } from "@/types/variety";

type VarietyProps = {
    vp: VarietyWithPercentageType;
    remove: (id: string) => void;
}

export default function Variety({ vp, remove }: VarietyProps) {
    const { variety } = vp;

    return (
        <div className="flex justify-between">
            <h3>{variety.name}</h3>
            <button
                onClick={() => remove(variety.id)}
                aria-label={`Remove ${variety.name} from selection`}
                className="cursor-pointer"
            >-</button>
        </div>
    )
}