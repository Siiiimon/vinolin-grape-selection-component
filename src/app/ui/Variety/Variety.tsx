import type { VarietyWithPercentageType } from "@/types/variety";

type VarietyProps = {
    vp: VarietyWithPercentageType;
    remove: (id: string) => void;
    onChangePercentage: (id: string, percentage: number) => void;
    percentageEnabled: boolean;
}

export default function Variety({ vp, remove, onChangePercentage, percentageEnabled }: VarietyProps) {
    const { variety, percentage } = vp;

    return (
        <div className="flex justify-between">
            <h3>{variety.name}</h3>
            <div className="flex items-center gap-2">
                {percentageEnabled && <input
                    type="number"
                    min={0}
                    max={100}
                    value={percentage}
                    onChange={(e) =>
                        onChangePercentage(variety.id, Number(e.target.value) || 0)
                    }
                    className="
                    w-16
                    px-2 py-1
                    bg-white
                    border border-gray-300
                    rounded
                    text-sm text-right
                    appearance-none
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]
                    transition
                    "
                />}
                <button
                    onClick={() => remove(variety.id)}
                    aria-label={`Remove ${variety.name} from selection`}
                    className="
                    flex items-center justify-center
                    w-6 h-6
                    text-gray-400
                    hover:text-red-600 hover:bg-red-50
                    rounded
                    focus:outline-none focus:ring-2 focus:ring-red-200
                    transition
                    "
                >-</button>
            </div>
        </div>
    )
}