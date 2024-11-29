/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import { basicLoaders, specificLoaders } from "../../../const"
import { useLocation } from "react-router-dom"
import { warmUp, routine as routineString } from "../../../components/Admin/Users/Edit"

const useInformation = (otherUserId: string, isWarmUpOrRoutine: string, chagenOtherRoutine: boolean) => {
    const { Routines, WarmUps, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const [loader, setLoader] = useState<string>()
    const query = useLocation()
    const rutina = 'rutina'
    const calentamiento = 'calentamiento'
    const [viewRoutineOtherUser, setViewRoutineOtherUser] = useState<{ id: string }[] | undefined>(undefined)

    useEffect(() => {
        updateIdGlobal(undefined)
        routineActual({ Days: undefined })
    }, [])

    useEffect(() => {
        const param = query.pathname.split('/')[1]
        if (otherUserId) {
            axios.get(`/user/getOneUser/${otherUserId}`).then((response) => {
                const warmUpsUser = response.data.WarmUps
                const routinesUser = response.data.Routines
                if (isWarmUpOrRoutine == warmUp) {
                    setViewRoutineOtherUser(warmUpsUser)
                    setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                    if (!chagenOtherRoutine) {
                        updateIdGlobal(warmUpsUser[warmUpsUser.length - 1].id)
                    }
                    axios.get(`/calentamiento/${routineId.id}`)
                        .then(response => {
                            routineActual(response.data)
                            setLoader(undefined)
                        })
                        .catch(error => window.alert(error.data.Error))
                } else if (isWarmUpOrRoutine == routineString) {
                    setViewRoutineOtherUser(routinesUser)
                    setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                    if (!chagenOtherRoutine) {
                        updateIdGlobal(routinesUser[routinesUser.length - 1].id)
                    }
                    axios.get(`/rutina/${routineId.id}`)
                        .then(response => {
                            routineActual(response.data)
                            setLoader(undefined)
                        })
                        .catch(error => window.alert(error.data.Error))
                }
            })
        } else if (param == rutina) {
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
        } else if (param == calentamiento) {
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
        viewRoutineOtherUser
    }
}

export default useInformation