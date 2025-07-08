"use client";
import { useEffect, useState } from "react"

export default function GrapeSelection() {
    const [currentVarieties, setCurrentVarieties] = useState<string[]>([]);

    useEffect(() => {
        setCurrentVarieties(["foo", "bar", "baz"]);
    }, []);

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
        </div>
    )
}