interface TypeInfo {
    name: string
}

export default function Type({ typeInfo }: { typeInfo: TypeInfo }) {
    const typeClasses = {
        normal: "bg-gray-300",
        fire: "bg-red-600",
        water: "bg-blue-300",
        electric: "bg-yellow-300",
        grass: "bg-green-300",
        ice: "bg-cyan-300",
        fighting: "bg-orange-400",
        poison: "bg-purple-500",
        ground: "bg-amber-500",
        flying: "bg-indigo-300",
        psychic: "bg-pink-600",
        bug: "bg-lime-300",
        rock: "bg-amber-700",
        ghost: "bg-indigo-400",
        steel: "bg-gray-400",
        dragon: "bg-blue-800",
        dark: "bg-black text-white",
        fairy: "bg-pink-300",
    }
    const defaultClass = "bg-white"

    const typeClass = typeClasses[typeInfo.name] || defaultClass

    return (
        <div className={`border-2 border-black border-1 px-2 rounded-md w-20 ${typeClass}`}>
            <p className="first-letter:uppercase text-slate-900">{typeInfo.name}</p>
        </div>
    )
}
