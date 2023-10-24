import Type from "./Type.tsx"

export default function CardS({ pokemon }) {
    return (
        <div className="w-60 h-68 bg-white border-2 border-black rounded-lg shadow-md">
            <div className="flex flex-col justify-center items-center">
                <img
                    src={pokemon.sprites.front_default}
                    className="absolute transform transition hover:scale-105 rounded-full w-32 border-2 p-1 bg-white border-black"
                    alt={pokemon.name}
                />
                <div className="w-full bg-red-600 rounded-t-lg h-28 border-b-2 border-black">
                    <p className="text-md mt-2 mr-2 text-right text-slate-100 ">Nº {pokemon.id}</p>
                </div>
                <div className="w-full h-28">
                    <p className="text-xl mt-20 first-letter:uppercase">{pokemon.name}</p>
                </div>
            </div>
            <div className="py-3 flex flex-row items-center justify-center gap-2">
                {pokemon.types.map((typeInfo) => (
                    <Type key={`pokemon ${typeInfo.slot}`} typeInfo={typeInfo.type} />
                ))}
            </div>
        </div>
    )
}
