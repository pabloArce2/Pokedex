import { useEffect, useState } from "react"

import typesList from "./assets/Types"
import CardS from "./components/CardS"
import Loading from "./components/Loading"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import TypeFilter from "./components/TypeFilter"

function App() {
    const [pokemons, setPokemons] = useState({})
    const [displayPokemons, setDisplayPokemons] = useState({})
    const [currentPokemonId, setCurrentPokemonId] = useState(1)
    const pokemonLimit = 1017
    const [selectedTypes, setSelectedTypes] = useState(typesList)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const toggleSidebar = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    useEffect(() => {
        async function getPokemonData() {
            try {
                if (currentPokemonId > pokemonLimit) {
                    return
                }

                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`)
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                const data = await res.json()

                setPokemons((prevPokemons) => ({
                    ...prevPokemons,
                    [currentPokemonId]: data,
                }))

                if (currentPokemonId < pokemonLimit) {
                    setCurrentPokemonId(currentPokemonId + 1)
                }
            } catch (error) {
                console.error("Error fetching Pokemon data:", error)
            }
        }

        getPokemonData()
    }, [currentPokemonId, pokemonLimit])

    useEffect(() => {
        const selectedCount = selectedTypes.filter((type) => type.selected).length
        const filteredPokemons = Object.values(pokemons).map((pokemon) => {
            let typeMatchs = 0
            for (let i = 0; i < pokemon.types.length; i++) {
                if (
                    selectedTypes.some(
                        (selectedType) => selectedType.name === pokemon.types[i].type.name && selectedType.selected
                    )
                ) {
                    typeMatchs++
                } else {
                    typeMatchs--
                }
            }
            return { pokemon, typeMatchs }
        })

        filteredPokemons.sort((a, b) => {
            if (a.typeMatchs === b.typeMatchs) {
                return a.pokemon.types.length - b.pokemon.types.length
            }
            return b.typeMatchs - a.typeMatchs
        })

        const sortedPokemons = filteredPokemons.map((entry) => entry.pokemon)

        if (selectedCount === selectedTypes.length) setDisplayPokemons(pokemons)
        else if (selectedCount === 0) setDisplayPokemons({})
        else setDisplayPokemons(sortedPokemons)
    }, [pokemons, selectedTypes])

    return (
        <div className="">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isDrawerOpen={isDrawerOpen} toggleSidebar={toggleSidebar}>
                <TypeFilter typesList={selectedTypes} setSelectedTypes={setSelectedTypes} />
            </Sidebar>

            <div className={`mt-32 duration-200 ${isDrawerOpen ? "ml-72" : ""}`}>
                <div className="grid-custom gap-10 px-24 py-12 text-center">
                    {Object.values(displayPokemons).length > 0 ? (
                        Object.values(displayPokemons).map((pokemon, index) => (
                            <CardS key={`pokemon ${index}`} pokemon={pokemon} />
                        ))
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
