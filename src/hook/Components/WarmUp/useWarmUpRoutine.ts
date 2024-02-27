/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import useLoaders from "../useLoaders"

const useWarmUpRoutine = () => {
    const { WarmUps, id } = useAppSelector(state => state.user)
    const warmUp = useAppSelector(state => state.warmup)
    const { warmUpActual } = useRoutineActions()
    const warmUpId = useAppSelector(state => state.warmUpId)
    const { updateWarmUpIdGlobal } = useRoutineIdActions()
    const { pending, setPending } = useLoaders()
    useEffect(() => {
        if (WarmUps.length > 0) {
            if (warmUpId.id == undefined) {
                setPending(true)
                updateWarmUpIdGlobal(WarmUps[WarmUps.length - 1].id)
            }
            axios.get(`/calentamiento/${warmUpId.id}`)
                .then(response => {
                    setPending(false)
                    warmUpActual(response.data)
                })
                .catch(error => console.log(error))
        } else warmUpActual({Days: undefined})
    }, [warmUpId.id])

    return { warmUp, WarmUps, warmUpActual, warmUpId, id, updateWarmUpIdGlobal, pending, setPending }
}

export default useWarmUpRoutine