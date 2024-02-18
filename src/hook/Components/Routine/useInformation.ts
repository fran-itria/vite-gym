/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"

const useInformation = () => {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const [routineId, setRoutineId] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (Routines.length > 0) {
            setRoutineId(Routines[Routines.length - 1].id)
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    routineActual(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [routineId])

    return { name, surname, routine, routineActual, routineId }
}

export default useInformation