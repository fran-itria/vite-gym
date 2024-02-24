/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routine, actualRoutine } from "../store/routine/slice"
import { WarmUp, actualWarmUp } from "../store/warmUp/slice"
import { useAppDispatch } from "./store"

export const useRoutineActions = () => {
    const dispatch = useAppDispatch()

    const routineActual = (Days: Routine) => {
        dispatch(actualRoutine(Days))
    }

    const warmUpActual = (Days: WarmUp) => {
        dispatch(actualWarmUp(Days))
    }
    return { routineActual, warmUpActual }
} 