import { Component } from "react"
import { Search } from "lucide-react"

class FilteredList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtro: "",
            lista: props.filteredPokemons,
        }
    }

    handleFiltroChange = (e) => {
        this.setState({ filtro: e.target.value })
    }

    getFilteredItems = () => {
        const { lista, filtro } = this.state

        if (!filtro) {
            return []
        }

        const listaFiltrada = lista.filter((item) => item.name.toLowerCase().includes(filtro.toLowerCase()))

        listaFiltrada.sort(
            (a, b) => a.name.indexOf(filtro) - b.name.indexOf(filtro) || a.name.length - b.name.length
        )

        // Devuelve solo los primeros 4 elementos
        return listaFiltrada.slice(0, 4)
    }

    render() {
        const filteredItems = this.getFilteredItems()

        return (
            <div className="w-full flex flex-col items-center justify-center">
                <div className="flex w-full items-center justify-center">
                    <Search className="-mr-8 z-10" />
                    <input
                        type="text"
                        placeholder="Buscar pokemon"
                        value={this.state.filtro}
                        onChange={this.handleFiltroChange}
                        className="p-2 pl-10 rounded-lg border-2 w-[40%]"
                    />
                </div>

                <ul>
                    {filteredItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default FilteredList
