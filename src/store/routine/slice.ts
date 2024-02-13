import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Routine {
    Days: {
        id: string | undefined,
        WarmUp?: string | null,
        Exercises: {
            id: string | null,
            exercise: number | null
            name: string | null
            series: number | null
            reps: string | null
            DayId: string | null
            Loads: {
                id: string | null
                loads: string | null
                ExerciseId: string | null
            }[] | []
        }[] | []
    }[] | undefined
}

const initialState: Routine = {
    Days: undefined
}

export const userSlice = createSlice({
    name: "routine",
    initialState,
    reducers: {
        actualRoutine: (_state, action: PayloadAction<Routine>) => {
            return {
                Days: action.payload.Days
            }
        }
    }
})

export default userSlice.reducer

export const { actualRoutine } = userSlice.actions