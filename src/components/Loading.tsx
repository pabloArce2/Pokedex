import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const Loading = () => {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const timer = setInterval(() => {
            setDots((dots) => (dots + 1) % 4)
        }, 500)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className={`flex gap-2 items-center justify-center`}>
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-lg">Loading{".".repeat(dots)}</p>
        </div>
    )
}

export default Loading
