/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"

const useInformation = () => {
    const { name, surname, Routines, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    useEffect(() => {
        if (Routines.length > 0) {
            if (routineId == undefined) updateIdGlobal(Routines[Routines.length - 1].id)
            axios.get(`/rutina/${routineId.id}`)
                .then(response => {
                    routineActual(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [routineId.id])

    return { name, surname, routine, Routines, routineActual, routineId, id, updateIdGlobal }
}

export default useInformation