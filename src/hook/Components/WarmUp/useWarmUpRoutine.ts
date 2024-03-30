/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"
import axios from "axios"
import useRoutineIdActions from "../../useRoutineIdActions"
import useLoaders from "../useLoaders"
import { basicLoaders, specificLoaders } from "../../../const"

const useWarmUpRoutine = () => {
    const { WarmUps, id } = useAppSelector(state => state.user)
    const warmUp = useAppSelector(state => state.warmup)
    const { warmUpActual } = useRoutineActions()
    const warmUpId = useAppSelector(state => state.warmUpId)
    const { updateWarmUpIdGlobal } = useRoutineIdActions()
    const { loader, setLoader } = useLoaders()
    useEffect(() => {
        if (WarmUps.length > 0) {
            setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.warm}` })
            if (warmUpId.id == undefined) {
                updateWarmUpIdGlobal(WarmUps[WarmUps.length - 1].id)
            }
            axios.get(`/calentamiento/${warmUpId.id}`)
                .then(response => {
                    warmUpActual(response.data)
                    setLoader({ state: false })
                })
                .catch(error => window.alert(error.data.Error))
        } else warmUpActual({ Days: undefined })
    }, [warmUpId.id])

    return {
        warmUp,
        WarmUps,
        warmUpActual,
        warmUpId,
        id,
        updateWarmUpIdGlobal,
        loader,
        setLoader
    }
}

export default useWarmUpRoutine