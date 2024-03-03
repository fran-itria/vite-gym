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
    const { create, setCreate } = useLoaders()
    useEffect(() => {
        if (Routines.length > 0) {
            if (routineId.id == undefined) {
                setCreate(true)
                updateIdGlobal(Routines[Routines.length - 1].id)
            }
            axios.get(`/rutina/${routineId.id}`)
                .then(response => {
                    console.log(response.data)
                    setCreate(false)
                    routineActual(response.data)
                })
                .catch(error => console.log(error))
        } else routineActual({weeks: 0, Days: undefined})
    }, [routineId.id])

    return { routine, Routines, routineActual, routineId, id, updateIdGlobal, create, setCreate }
}

export default useInformation