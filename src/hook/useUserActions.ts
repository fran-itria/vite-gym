import { RoutinesUser, User, WarmUpsUser, extraTraining, meal, shift, updateExtraTraining, updateMeals, updateRoutineUser, updateShifts, updateUser, updateWarmUpsUser } from "../store/user/slice"
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

    const updateShiftsUser = (shifts: shift[]) => {
        dispatch(updateShifts(shifts))
    }
    
    return { addUser, updateRoutinesUser, updateWarmUpUser, updateMealsUser, updateTrainingsUser, updateShiftsUser}
}