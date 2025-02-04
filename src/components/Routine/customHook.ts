/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import { useRoutineActions } from "../../hook/useRoutineActions"
import useRoutineIdActions from "../../hook/useRoutineIdActions"
import { getRoutine, otherUserRoutine } from "./services"

interface Props {
    otherUserId: string | undefined,
    chagenOtherRoutine: boolean,
    setChangeOtherRoutine: React.Dispatch<React.SetStateAction<boolean>>
}

const useRoutine = ({ chagenOtherRoutine, otherUserId, setChangeOtherRoutine }: Props) => {
    const { Routines, id } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = useAppSelector(state => state.routineIdGlobal)
    const { updateIdGlobal } = useRoutineIdActions()
    const [loader, setLoader] = useState<string>()
    const [viewRoutineOtherUser, setViewRoutineOtherUser] = useState<{ id: string }[] | undefined>(undefined)

    useEffect(() => {
        if (!Routines.length) return
        if (!routineId) {
            updateIdGlobal(Routines[Routines.length - 1]?.id)
            routineActual({ Days: undefined, weeks: 0 })
        }
    }, [Routines])

    useEffect(() => {
        if (!routineId) return
        if (otherUserId) {
            otherUserRoutine({
                chagenOtherRoutine,
                setChangeOtherRoutine,
                setLoader,
                setViewRoutineOtherUser,
                userId: otherUserId,
                routineActual,
                updateRoutineId: updateIdGlobal
            })
        }
        else {
            getRoutine({ id: routineId, routineActual, setLoader })
        }
    }, [routineId])

    // useEffect(() => {
    //     return () => {
    //         updateIdGlobal(undefined);
    //     };
    // }, []);

    return {
        routine,
        routineActual,
        routineId,
        id,
        updateIdGlobal,
        loader,
        setLoader,
        Routines,
        viewRoutineOtherUser
    }
}

export default useRoutine