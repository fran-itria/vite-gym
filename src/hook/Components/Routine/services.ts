import axios from "axios"
import { CaseResolve } from "../../../types"
import { basicLoaders, specificLoaders } from "../../../const"
import { Routine } from "../../../store/routine/slice"

type otherProps = {
    otherUserId: string
    isWarmUpOrRoutine: CaseResolve | undefined
    setViewRoutineOtherUser: (value: React.SetStateAction<{
        id: string;
    }[] | undefined>) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
    chagenOtherRoutine: boolean
    updateIdGlobal: (id: string | undefined) => void
    routineActual: (Days: Routine) => void
    setChangeOtherRoutine: (value: React.SetStateAction<boolean>) => void
    routineId: string
}

type routineOrWarmProps = {
    param: string
    routineId: string
    routineActual: (Days: Routine) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
    updateIdGlobal: (id: string | undefined) => void
    routineOrWarmUp: [] | {
        id: string;
    }[]
}

export const otherUser = ({
    chagenOtherRoutine,
    isWarmUpOrRoutine,
    otherUserId,
    routineActual,
    setChangeOtherRoutine,
    setLoader,
    setViewRoutineOtherUser,
    updateIdGlobal,
    routineId
}: otherProps) => {
    axios.get(`/user/getOneUser/${otherUserId}`).then((response) => {
        const warmUpsUser = response.data.WarmUps
        const routinesUser = response.data.Routines
        if (isWarmUpOrRoutine == CaseResolve.calentamiento) {
            setViewRoutineOtherUser(warmUpsUser)
            if (warmUpsUser.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                if (!chagenOtherRoutine) {
                    updateIdGlobal(warmUpsUser[warmUpsUser.length - 1].id)
                }
                axios.get(`/calentamiento/${routineId}`)
                    .then(response => {
                        routineActual(response.data)
                        setChangeOtherRoutine(false)
                    })
                    .catch(error => {
                        setLoader(undefined)
                        window.alert(error.data.Error)
                    })
            } else {
                routineActual({ Days: undefined })
            }
        } else if (isWarmUpOrRoutine == CaseResolve.rutina) {
            setViewRoutineOtherUser(routinesUser)
            if (routinesUser.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                if (!chagenOtherRoutine) {
                    updateIdGlobal(routinesUser[routinesUser.length - 1].id)
                }
                axios.get(`/rutina/${routineId}`)
                    .then(response => {
                        routineActual(response.data)
                        setChangeOtherRoutine(false)
                    })
                    .catch(error => {
                        setLoader(undefined)
                        window.alert(error.data.Error)
                    })
            } else {
                routineActual({ weeks: 0, Days: undefined })
            }
        }
        setLoader(undefined)
    })
}

export const routineOrWarmUpFunction = ({ param, routineActual, routineId, routineOrWarmUp, setLoader, updateIdGlobal }: routineOrWarmProps) => {
    const rutina = 'rutina'
    if (routineOrWarmUp.length > 0) {
        setLoader(`${basicLoaders.loading} ${param == rutina ? specificLoaders.routine : specificLoaders.warm}`)
        if (routineId == undefined) {
            updateIdGlobal(routineOrWarmUp[routineOrWarmUp.length - 1].id)
        }
        axios.get(`/${param}/${routineId}`)
            .then(response => {
                routineActual(response.data)
                setLoader(undefined)
            })
            .catch(error => window.alert(error.data.Error))
    } else {
        if (param == rutina)
            routineActual({ weeks: 0, Days: undefined })
        else routineActual({ Days: undefined })
    }
}