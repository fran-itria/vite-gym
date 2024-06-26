import {
    RoutinesUser,
    User,
    WarmUpsUser,
    extraTraining,
    meal,
    payments,
    shift,
    updateExtraTraining,
    updateGymId,
    updateMeals,
    updatePayments,
    updatePhoto,
    updateRoutineUser,
    updateShifts,
    updateStateSubscription,
    updateUser,
    updateWarmUpsUser
} from "../store/user/slice"
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

    const updatePaymentsUser = (payments: payments[]) => {
        dispatch(updatePayments(payments))
    }

    const updatePayUser = (pay: boolean) => {
        dispatch(updateStateSubscription(pay))
    }

    const updatePhotoUser = (photo: string) => {
        dispatch(updatePhoto(photo))
    }

    const updateGymUser = (gymName: string, gymId: string) => {
        dispatch(updateGymId({ gymName, gymId }))
    }

    return {
        addUser,
        updateRoutinesUser,
        updateWarmUpUser,
        updateMealsUser,
        updateTrainingsUser,
        updateShiftsUser,
        updatePaymentsUser,
        updatePayUser,
        updatePhotoUser,
        updateGymUser
    }
}