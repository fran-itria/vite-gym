import { RoutinesUser, User, WarmUpsUser, extraTraining, meal, updateExtraTraining, updateMeals, updateRoutineUser, updateUser, updateWarmUpsUser } from "../store/user/slice"
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

    const updateTrainingsUser = (trainings: extraTraining[]) => {
        dispatch(updateExtraTraining(trainings))
    }

    return { addUser, updateRoutinesUser, updateWarmUpUser, updateMealsUser, updateTrainingsUser}
}