/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import useLoaders from "../useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"
import { useLocation } from "react-router-dom"

const useInformation = () => {
    const { Routines, WarmUps, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const { loader, setLoader } = useLoaders()
    const query = useLocation()
    const rutina = 'rutina'
    const calentamiento = 'calentamiento'

    useEffect(() => updateIdGlobal(undefined), [])

    useEffect(() => {
        const param = query.pathname.split('/')[1]
        if (param == rutina) {
            if (Routines.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                if (routineId.id == undefined) {
                    updateIdGlobal(Routines[Routines.length - 1].id)
                }
                axios.get(`/rutina/${routineId.id}`)
                    .then(response => {
                        routineActual(response.data)
                        setLoader(undefined)
                    })
                    .catch(error => window.alert(error.data.Error))
            } else {
                routineActual({ weeks: 0, Days: undefined })
            }
        }
        else if (param == calentamiento) {
            if (WarmUps.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                if (routineId.id == undefined) {
                    updateIdGlobal(WarmUps[WarmUps.length - 1].id)
                }
                axios.get(`/calentamiento/${routineId.id}`)
                    .then(response => {
                        routineActual(response.data)
                        setLoader(undefined)
                    })
                    .catch(error => window.alert(error.data.Error))
            } else routineActual({ Days: undefined })
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
        setLoader,
        WarmUps,
    }
}

export default useInformation