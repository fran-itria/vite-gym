import { User, actualiceUser } from "../store/user/slice"
import { useAppDispatch } from "./store"

export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const addUser = (inputs: User) => {
        dispatch(actualiceUser(inputs))
    }

    return { addUser }
}