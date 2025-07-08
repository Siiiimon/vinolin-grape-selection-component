"use client";
import { useState } from "react"
import GrapeChooser from "../VarietyChooser/VarietyChooser";

export default function GrapeSelection() {
    const [currentVarieties, setCurrentVarieties] = useState<string[]>(["foo", "bar", "baz"]);
    const [availableVarieties, setAvailableVarieties] = useState<string[]>(["Merlot", "Cabernet Sauvingnong", "Cabernet Franc"]);
    const [showChooserPopup, setShowChooserPopup] = useState<boolean>(false);

    const chooseVariety = (variety: string) => {
        setCurrentVarieties(varieties => [...varieties, variety]);
        setAvailableVarieties(varieties => varieties.filter(v => v !== variety));
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
                <h3 key={variety}>{variety}</h3>
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