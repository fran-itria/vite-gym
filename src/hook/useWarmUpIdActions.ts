import { useDispatch } from "react-redux"
import { updateId } from "../store/warmUpIdGlobal/slice"

export default function useWarmUpIdActions() {
    const dispatch = useDispatch()

    const updateWarmUpIdGlobal = (id: string | undefined) => {
        dispatch(updateId(id))
    }

    return { updateWarmUpIdGlobal }
}