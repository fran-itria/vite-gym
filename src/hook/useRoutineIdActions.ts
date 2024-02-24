import { useDispatch } from "react-redux"
import { updateId } from "../store/routineIdGlobal/slice"
import { updateWarmUpId } from "../store/warmUpId/slice"

export default function useRoutineIdActions() {
    const dispatch = useDispatch()

    const updateIdGlobal = (id: string) => {
        dispatch(updateId(id))
    }

    const updateWarmUpIdGlobal = (id: string) => {
        dispatch(updateWarmUpId(id))
    }
    return { updateIdGlobal, updateWarmUpIdGlobal }
}