import { useState } from "react";

export default function useDayCreate() {
    const [addDay, setAddDay] = useState<boolean>(false)
    const [totalExercise, setTotalExercise] = useState<string>('0')
    const [pag, setPag] = useState<number>(0)
    const [dayCreate, setDayCreate] = useState<{ exercise?: number; name?: string; series?: string; reps?: string; link?: string}[]>([])

    return { addDay, setAddDay, totalExercise, setTotalExercise, pag, setPag, dayCreate, setDayCreate }
}