/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import useLoaders from "../useLoaders"

const useInformation = () => {
    const { Routines, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const { pending, setPending } = useLoaders()
    useEffect(() => {
        if (Routines.length > 0) {
            setPending(true)
            if (routineId.id == undefined) updateIdGlobal(Routines[Routines.length - 1].id)
            axios.get(`/rutina/${routineId.id}`)
                .then(response => {
                    setPending(false)
                    routineActual(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [routineId.id])

    return { routine, Routines, routineActual, routineId, id, updateIdGlobal, pending, setPending }
}

export default useInformation