import axios from "axios"
import { CaseResolve } from "../../../types"
import { basicLoaders, specificLoaders } from "../../../const"
import { Routine } from "../../../store/routine/slice"
import sweetAlert from "../../../services/swartAlert"
import { WarmUp } from "../../../store/warmUp/slice"

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
    warmUpActual: (Days: WarmUp) => void
    setChangeOtherRoutine: (value: React.SetStateAction<boolean>) => void
    routineId: string
}

type routineOrWarmProps = {
    param: string
    routineId: string
    routineActual?: (Days: Routine) => void
    warmUpActual?: (Days: WarmUp) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
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
    routineId,
    warmUpActual
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
                        warmUpActual(response.data)
                        setChangeOtherRoutine(false)
                    })
                    .catch(error => {
                        setLoader(undefined)
                        sweetAlert(error.data.Error)
                    })
            } else {
                warmUpActual({ Days: undefined })
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
                        sweetAlert(error.data.Error)
                    })
            } else {
                routineActual({ weeks: 0, Days: undefined })
            }
        }
        setLoader(undefined)
    })
}

export const routineOrWarmUpFunction = ({ param, routineActual, warmUpActual, routineId, routineOrWarmUp, setLoader }: routineOrWarmProps) => {
    if (routineOrWarmUp.length > 0) {
        setLoader(`${basicLoaders.loading} ${param == 'routine' ? specificLoaders.routine : specificLoaders.warm}`)
        if (param == 'routine' && routineActual) {
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    routineActual(response.data)
                    setLoader(undefined)
                })
                .catch(error => sweetAlert(error.data.Error))
        } else {
            if (param == 'routine' && routineActual)
                routineActual({ weeks: 0, Days: undefined })
            else if (param == 'warmUp' && warmUpActual) warmUpActual({ Days: undefined })
        }
    }
}