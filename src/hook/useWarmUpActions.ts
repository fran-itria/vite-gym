/* eslint-disable @typescript-eslint/no-explicit-any */
import { WarmUp, actualWarmUp } from "../store/warmUp/slice"
import { useAppDispatch } from "./store"

export const useWarmUpActions = () => {
    const dispatch = useAppDispatch()

    const warmUpActual = (Days: WarmUp) => {
        dispatch(actualWarmUp(Days))
    }

    return { warmUpActual }
} 