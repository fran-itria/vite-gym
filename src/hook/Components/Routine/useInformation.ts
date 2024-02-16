/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"

const useInformation = () => {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    let routineId
    if (Routines.length > 0) {
        routineId = Routines[Routines.length - 1].id
    }

    useEffect(() => {
        if (Routines.length > 0) {
            const routineId = Routines[0].id
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    routineActual(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [])

    return { name, surname, routine, routineActual, routineId }
}

export default useInformation