import { useDispatch } from "react-redux"
import { updateId } from "../store/routineIdGlobal/slice"

export default function useRoutineIdActions() {
    const dispatch = useDispatch()

    const updateIdGlobal = (id: string) => {
        dispatch(updateId(id))
    }
    return { updateIdGlobal }
}