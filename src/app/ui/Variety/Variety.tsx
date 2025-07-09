import type { VarietyWithPercentageType } from "@/types/variety";

type VarietyProps = {
    vp: VarietyWithPercentageType;
    remove: (id: string) => void;
    onChangePercentage: (id: string, percentage: number) => void;
}

export default function Variety({ vp, remove, onChangePercentage }: VarietyProps) {
    const { variety, percentage } = vp;

    return (
        <div className="flex justify-between">
            <h3>{variety.name}</h3>
            <div>
                <input
                    type="number"
                    min={0}
                    max={100}
                    value={percentage}
                    onChange={(e) =>
                        onChangePercentage(variety.id, Number(e.target.value) || 0)
                    }
                    className="w-16 px-1 py-0.5 rounded text-sm text-right mr-4 appearance-none"
                />
                <button
                    onClick={() => remove(variety.id)}
                    aria-label={`Remove ${variety.name} from selection`}
                    className="cursor-pointer"
                >-</button>
            </div>
        </div>
    )
}