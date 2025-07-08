import type { Variety } from "@/types/variety";

type VarietyProps = {
    variety: Variety;
}

export default function Variety({ variety }: VarietyProps) {
    return (
        <h3>{variety.name}</h3>
    )
}