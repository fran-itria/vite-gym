import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Routine {
    weeks?: number
    Days: {
        id: string
        WarmUp?: string
        Exercises: {
            id?: string
            exercise?: number
            name?: string
            series?: number
            reps?: string
            link?: string
            DayId?: string
            Loads?: {
                id?: string
                loads?: string
                ExerciseId?: string
            }[] | []
        }[] | []
    }[] | undefined
}

const initialState: Routine = {
    weeks: 0,
    Days: undefined
}

export const routineSlice = createSlice({
    name: "routine",
    initialState,
    reducers: {
        actualRoutine: (_state, action: PayloadAction<Routine>) => {
            if (action.payload.weeks) {
                return {
                    weeks: action.payload.weeks,
                    Days: action.payload.Days
                }
            } else {
                return {
                    Days: action.payload.Days
                }
            }
        }
    }
})

export default routineSlice.reducer

export const { actualRoutine } = routineSlice.actions