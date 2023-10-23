import Backwards from "../assets/icons/backwards.svg"
import Pokedex from "../assets/images/pokedex.png"

interface SidebarProps {
    isDrawerOpen: boolean
    toggleSidebar: () => void
    children: any
}

export default function Sidebar({ isDrawerOpen, toggleSidebar, children }: SidebarProps) {
    return (
        <>
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-72 h-screen p-4 overflow-y-auto transition-transform shadow-2xl ${
                    isDrawerOpen ? "" : "-translate-x-full"
                } bg-white dark:bg-gray-800`}
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
            >
                <div className="flex items-center mb-4">
                    <img src={Pokedex} alt="Pokedex" className="w-12" />
                    <p
                        id="drawer-navigation-label"
                        className="text-xl font-semibold text-gray-500 uppercase dark:text-gray-400"
                    >
                        Filtrar
                    </p>

                    <button
                        type="button"
                        onClick={toggleSidebar}
                        data-drawer-hide="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className=" hover:bg-gray-200 rounded-lg p-1.5 absolute right-2.5 dark:hover:bg-gray-600"
                    >
                        <img src={Backwards} className="w-4" alt="Go back" />
                    </button>
                </div>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">{children}</ul>
                </div>
            </div>
        </>
    )
}
