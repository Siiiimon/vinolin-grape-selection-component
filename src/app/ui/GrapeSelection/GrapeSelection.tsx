"use client";
import { useState } from "react"
import VarietyChooser from "../VarietyChooser/VarietyChooser";
import type { VarietyType } from "@/types/variety";
import Variety from "../Variety/Variety";

export default function GrapeSelection({
    varieties,
}: {
    varieties: VarietyType[];
}) {
    const [currentVarieties, setCurrentVarieties] = useState<VarietyType[]>(varieties.slice(0, 3));
    const [showChooserPopup, setShowChooserPopup] = useState<boolean>(false);

    const addVariety = (variety: VarietyType) => {
        setCurrentVarieties(varieties => [...varieties, variety]);
        setShowChooserPopup(false);
    }

    const removeVariety = (variety: VarietyType) => {
        setCurrentVarieties(varieties => varieties.filter(v => v.id !== variety.id));
    }

    return (
        <div>
            <input type="text" className="
                block py-2.5 px-0 w-full text-sm
                text-gray-900 bg-transparent appearance-none
                focus:outline-none"
                placeholder="Name"
            />
            {currentVarieties.map(variety => (
                <Variety key={variety.id} variety={variety} remove={removeVariety} />
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
                                chosenVarieties={currentVarieties}
                                chooseVariety={addVariety}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}