import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Type {
    name: string
    selected: boolean
}

interface TypeFilterProps {
    typesList: Type[]
    setSelectedTypes: React.Dispatch<React.SetStateAction<Type[]>>
}

export default function TypeFilter({ typesList, setSelectedTypes }: TypeFilterProps) {
    const [openTypeFilter, setOpenTypeFilter] = useState(false)
    const allChecked = typesList.every((type) => type.selected)

    const handleAllChange = () => {
        const newSelectedStatus = !allChecked

        const updatedTypes = typesList.map((type) => ({
            ...type,
            selected: newSelectedStatus,
        }))

        setSelectedTypes(updatedTypes)
    }

    const handleTypeCheckboxChange = (typeName: string) => {
        const updatedTypes = typesList.map((type) => {
            if (type.name === typeName) {
                return { ...type, selected: !type.selected }
            }
            return type
        })

        setSelectedTypes(updatedTypes)
    }

    return (
        <div>
            <div
                className={`flex gap-3 items-center font-semibold text-xl hover:cursor-pointer hover:bg-slate-100 py-3 border p-2 ${
                    openTypeFilter ? "bg-slate-100 rounded-t-xl" : "rounded-xl"
                }`}
                onClick={() => setOpenTypeFilter(!openTypeFilter)}
            >
                <p>Filtrar por tipo</p>
                {openTypeFilter ? <ChevronUp /> : <ChevronDown />}
            </div>

            <div className={`${openTypeFilter ? "h-[50rem]" : "h-0 "} duration-500 overflow-hidden`}>
                {typesList.map((type) => (
                    <label
                        className="flex flex-row items-center border p-1 mb-1 hover:bg-slate-100 hover:cursor-pointer"
                        key={type.name}
                    >
                        <p className="first-letter:uppercase text-lg">{type.name}</p>
                        <input
                            type="checkbox"
                            className="ml-auto"
                            value={type.name}
                            checked={type.selected}
                            onChange={() => handleTypeCheckboxChange(type.name)}
                        />
                    </label>
                ))}

                <div className="flex py-2 px-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={handleAllChange}
                            checked={allChecked}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Seleccionar todos
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}
