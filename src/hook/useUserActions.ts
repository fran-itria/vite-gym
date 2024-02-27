import { RoutinesUser, User, WarmUpsUser, meal, updateMeals, updateRoutineUser, updateUser, updateWarmUpsUser } from "../store/user/slice"
import { useAppDispatch } from "./store"

export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const addUser = (inputs: User) => {
        dispatch(updateUser(inputs))
    }

    const updateRoutinesUser = (routine: RoutinesUser) => {
        dispatch(updateRoutineUser(routine))
    }

    const updateWarmUpUser = (warmUps: WarmUpsUser) => {
        dispatch(updateWarmUpsUser(warmUps))
    }

    const updateMealsUser = (meals: meal[]) => {
        dispatch(updateMeals(meals))
    }

    return { addUser, updateRoutinesUser, updateWarmUpUser, updateMealsUser}
}