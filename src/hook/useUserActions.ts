import { RoutinesUser, User, actualiceRoutineUser, actualiceUser } from "../store/user/slice"
import { useAppDispatch } from "./store"

export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const addUser = (inputs: User) => {
        dispatch(actualiceUser(inputs))
    }

    const actualiceRoutinesUser = (routine: RoutinesUser) => {
        dispatch(actualiceRoutineUser(routine))
    }

    return { addUser, actualiceRoutinesUser }
}