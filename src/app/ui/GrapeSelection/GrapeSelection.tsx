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

    const total = useMemo(
        () => currentVPs.reduce((sum, vp) => sum + vp.percentage, 0),
        [currentVPs]
    );

    const showPercentageError = total !== 100 && currentVPs.length > 0;

    return (
        <div>
            <input type="text" className="
                block py-2.5 px-0 w-full text-sm
                text-gray-900 bg-transparent appearance-none
                focus:outline-none"
                placeholder="Name"
            />
            {currentVPs.map(vp => (
                <Variety
                    key={vp.variety.id}
                    vp={vp}
                    remove={removeVariety}
                    onChangePercentage={onChangePercentage}
                />
            ))}

            <div className="relative inline-block">
                <button
                    onClick={() => setShowChooserPopup(shown => !shown)}
                    aria-label={`Add a grape variety`}
                    className="cursor-pointer"
                >+</button>
                {showChooserPopup && 
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowChooserPopup(false)}>
                        </div>
                        <div className="
                        absolute left-0 top-0 mt-2 w-64 max-h-60 overflow-y-auto shadow-lg z-20
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
            {showPercentageError &&
                <div className="
                    mt-8
                    bg-red-50 border border-red-400
                    text-red-800
                    px-3 py-2
                    rounded-md
                    shadow-lg
                    flex items-start gap-2
                    w-64
                    z-20
                "
                role="alert">
                    <span className="text-sm">
                        Alle Rebsorten müssen insgesamt <strong>100%</strong> ergeben.
                    </span>
                </div>
            }
        </div>
    )
}