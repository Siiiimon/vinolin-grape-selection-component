"use client";
import { useState } from "react"
import GrapeChooser from "../VarietyChooser/VarietyChooser";
import { Variety } from "@/types/variety";
import Grape from "../Variety/Variety";

export default function GrapeSelection({
    varieties,
}: {
    varieties: Variety[];
}) {
    const [currentVarieties, setCurrentVarieties] = useState<Variety[]>(varieties.slice(0, 3));
    const [showChooserPopup, setShowChooserPopup] = useState<boolean>(false);

    const addVariety = (variety: Variety) => {
        setCurrentVarieties(varieties => [...varieties, variety]);
        setShowChooserPopup(false);
    }

    const removeVariety = (variety: Variety) => {
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
                <Grape key={variety.id} variety={variety} remove={removeVariety} />
            ))}

            <div className="relative inline-block">
                <button onClick={() => setShowChooserPopup(shown => !shown)} className="cursor-pointer">+</button>
                {showChooserPopup && 
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowChooserPopup(false)}>
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className="
                        absolute left-0 top-0 mt-2 w-64 max-h-60 overflow-y-auto shadow-lg
                        ">
                            <GrapeChooser
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