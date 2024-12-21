/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import useRoutineIdActions from "../../useRoutineIdActions"
import { useLocation } from "react-router-dom"
import { CaseResolve } from "../../../types"
import { otherUser, routineOrWarmUpFunction } from "./services"

const useInformation = (otherUserId: string | undefined, isWarmUpOrRoutine: CaseResolve | undefined, chagenOtherRoutine: boolean, setChangeOtherRoutine: React.Dispatch<React.SetStateAction<boolean>>) => {
    const { Routines, WarmUps, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const [loader, setLoader] = useState<string>()
    const query = useLocation()
    const [viewRoutineOtherUser, setViewRoutineOtherUser] = useState<{ id: string }[] | undefined>(undefined)

    useEffect(() => {
        updateIdGlobal(undefined)
        routineActual({ Days: undefined })
    }, [])

    useEffect(() => {
        const param = query.pathname.split('/')[1]
        if (otherUserId)
            otherUser({
                chagenOtherRoutine,
                isWarmUpOrRoutine,
                otherUserId,
                routineActual,
                routineId: routineId.id,
                setChangeOtherRoutine,
                setLoader,
                setViewRoutineOtherUser,
                updateIdGlobal
            })
        else
            routineOrWarmUpFunction({
                param,
                routineActual,
                routineId: routineId.id,
                routineOrWarmUp: param == 'rutina' ? Routines : WarmUps,
                setLoader,
                updateIdGlobal
            })
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