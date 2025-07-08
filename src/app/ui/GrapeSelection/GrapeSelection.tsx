"use client";
import { useState } from "react"
import GrapeChooser from "../VarietyChooser/VarietyChooser";
import { Variety } from "@/types/variety";

export default function GrapeSelection({
    varieties,
}: {
    varieties: Variety[];
}) {
    const [currentVarieties, setCurrentVarieties] = useState<Variety[]>(varieties.slice(0, 3));
    const [availableVarieties, setAvailableVarieties] = useState<Variety[]>(varieties);
    const [showChooserPopup, setShowChooserPopup] = useState<boolean>(false);

    const chooseVariety = (variety: Variety) => {
        setCurrentVarieties(varieties => [...varieties, variety]);
        setAvailableVarieties(varieties => varieties.filter(v => v.id !== variety.id));
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
                <h3 key={variety.id}>{variety.name}</h3>
            ))}
            <button onClick={() => setShowChooserPopup(shown => !shown)}>+</button>
            {showChooserPopup && 
                <div>
                    <GrapeChooser varieties={availableVarieties} chooseVariety={chooseVariety}/>
                </div>
            }
        </div>
    )
}