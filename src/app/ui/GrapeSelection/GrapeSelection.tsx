"use client";
import { useMemo, useState } from "react"
import VarietyChooser from "../VarietyChooser/VarietyChooser";
import type { VarietyType, VarietyWithPercentageType } from "@/types/variety";
import Variety from "../Variety/Variety";

export default function GrapeSelection({
    varieties,
}: {
    varieties: VarietyType[];
}) {
    const [currentVPs, setCurrentVPs] = useState<VarietyWithPercentageType[]>([]);
    const [showChooserPopup, setShowChooserPopup] = useState<boolean>(false);
    const [wineName, setWineName] = useState<string>("");

    const addVariety = (variety: VarietyType) => {
        setCurrentVPs(varieties => [...varieties, {variety, percentage: 0}]);
        setShowChooserPopup(false);
    }

    const removeVariety = (id: string) => {
        setCurrentVPs(varieties => varieties.filter(v => v.variety.id !== id));
    }

    const onChangePercentage = (id: string, percentage: number) => {
        setCurrentVPs(vp =>
            vp.map(v =>
                v.variety.id === id ? {...v, percentage: percentage} : v
            )
        )
    }

    const dataUri = useMemo(() => {
        const json = encodeURIComponent(JSON.stringify({
            "name": wineName || "wein name",
            "grapeVarieties": currentVPs
        }, null, 2));
        return `data:application/json;charset=utf-8,${json}`;
    }, [currentVPs, wineName]);

    const total = useMemo(
        () => currentVPs.reduce((sum, vp) => sum + vp.percentage, 0),
        [currentVPs]
    );

    const showPercentageError = total !== 100 && currentVPs.length > 0;

    return (
        <div className="w-64 p-4 mx-auto space-y-4 bg-white rounded-md">
            <input type="text" placeholder="Name" className="
                block py-2.5 px-0 w-full text-2xl
                text-gray-900 bg-transparent appearance-none
                focus:outline-none"
                onChange={(e) => {
                    setWineName(e.target.value);
                }}
            />
            {currentVPs.length > 0 && <hr className="border-gray-400" /> }
            {currentVPs.map(vp => (
                <Variety
                    key={vp.variety.id}
                    vp={vp}
                    remove={removeVariety}
                    onChangePercentage={onChangePercentage}
                />
            ))}

            <div className="relative block mx-auto">
                <button
                    onClick={() => setShowChooserPopup(shown => !shown)}
                    aria-label={`Add a grape variety`}
                    className="
                    flex items-center justify-center
                    w-8 h-8
                    bg-white border border-gray-300
                    rounded-full
                    hover:bg-[var(--color-primary)] hover:text-white cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50
                    transition
                    mx-auto
                    "
                >+</button>
                {showChooserPopup && 
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowChooserPopup(false)}>
                        </div>
                        <div className="
                        absolute left-1/2 transform -translate-x-1/2 top-full mt-2
                        w-64 max-h-60 overflow-y-auto
                        bg-white shadow-lg border border-gray-200 rounded-md z-20
                        ">
                            <VarietyChooser
                                availableVarieties={varieties}
                                chosenVarieties={currentVPs.map(v => v.variety)}
                                chooseVariety={addVariety}
                            />
                        </div>
                    </>
                }
            </div>
            {showPercentageError ?
                <div className="
                mt-8
                bg-red-50 border border-red-400
                text-red-800
                px-3 py-2
                rounded-md shadow-lg
                flex items-start gap-2
                w-full
                "
                role="alert">
                    <span className="text-sm">
                        Alle Rebsorten müssen insgesamt <strong>100%</strong> ergeben.
                    </span>
                </div>
            :
                currentVPs.length > 0 &&
                <a href={dataUri} download="grape-selection.json"
                className="
                w-full mt-8
                inline-flex items-center justify-center
                px-4 py-2
                text-sm font-medium
                bg-[var(--color-primary)] text-white
                rounded-md shadow-sm
                cursor-pointer
                transition
                ">speichern</a>
            }
        </div>
    )
}