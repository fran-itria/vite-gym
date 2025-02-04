/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import { useWarmUpActions } from "../../hook/useWarmUpActions"
import useWarmUpIdActions from "../../hook/useWarmUpIdActions"
import { getWarmUp, otherUserWarmUp } from "./services"

interface Props {
    otherUserId: string | undefined,
    chagenOtherRoutine: boolean,
    setChangeOtherRoutine: React.Dispatch<React.SetStateAction<boolean>>
}

const useWarmUp = ({ chagenOtherRoutine, otherUserId, setChangeOtherRoutine }: Props) => {
    const { WarmUps, id } = useAppSelector(state => state.user)
    const warmUp = useAppSelector(state => state.warmUp)
    const { warmUpActual } = useWarmUpActions()
    const warmUpId = useAppSelector(state => state.warmUpIdGlobal)
    const { updateWarmUpIdGlobal } = useWarmUpIdActions()
    const [loader, setLoader] = useState<string>()
    const [viewRoutineOtherUser, setViewRoutineOtherUser] = useState<{ id: string }[] | undefined>(undefined)

    useEffect(() => {
        if (!WarmUps.length) return
        updateWarmUpIdGlobal(WarmUps[WarmUps.length - 1]?.id)
        warmUpActual({ Days: undefined })
    }, [WarmUps])

    useEffect(() => {
        console.log(warmUpId)
        if (!warmUpId) return
        if (otherUserId) {
            otherUserWarmUp({
                chagenOtherRoutine,
                // id: warmUpId,
                setChangeOtherRoutine,
                setLoader,
                setViewRoutineOtherUser,
                updateWarmUpIdGlobal,
                userId: otherUserId,
                warmUpActual
            })
        }
        else {
            getWarmUp({ id: warmUpId, warmUpActual, setLoader })
        }
    }, [warmUpId])

    return {
        warmUp,
        warmUpActual,
        warmUpId,
        id,
        updateWarmUpIdGlobal,
        loader,
        setLoader,
        WarmUps,
        viewRoutineOtherUser
    }
}

export default useWarmUp