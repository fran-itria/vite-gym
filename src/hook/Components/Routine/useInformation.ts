/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import useLoaders from "../useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"

const useInformation = () => {
    const { Routines, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const { loader, setLoader } = useLoaders()


    useEffect(() => {
        if (Routines.length > 0) {
            setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.routine}` })
            if (routineId.id == undefined) {
                updateIdGlobal(Routines[Routines.length - 1].id)
            }
            axios.get(`/rutina/${routineId.id}`)
                .then(response => {
                    routineActual(response.data)
                    setLoader({ state: false })
                })
                .catch(error => console.log(error))
        } else {
            routineActual({ weeks: 0, Days: undefined })
        }
    }, [routineId.id])

    return {
        routine,
        Routines,
        routineActual,
        routineId,
        id,
        updateIdGlobal,
        loader,
        setLoader
    }
}

export default useInformation