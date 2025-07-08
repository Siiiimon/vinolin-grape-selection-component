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

    const chooseVariety = (variety: Variety) => {
        setCurrentVarieties(varieties => [...varieties, variety]);
        setShowChooserPopup(false);
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
                <Grape key={variety.id} variety={variety} />
            ))}
            <button onClick={() => setShowChooserPopup(shown => !shown)} className="cursor-pointer">+</button>
            {showChooserPopup && 
                <div className="absolute max-h-60 overflow-y-auto shadow-lg">
                    <GrapeChooser
                        availableVarieties={varieties}
                        chosenVarieties={currentVarieties}
                        chooseVariety={chooseVariety}
                    />
                </div>
            }
        </div>
    )
}