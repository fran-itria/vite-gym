import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WarmUp {
    Days: {
        id: string
        WarmUp?: string
        Exercises: {
            id: string
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

const initialState: WarmUp = {
    Days: undefined
}

export const warmUpSlice = createSlice({
    name: "warmUp",
    initialState,
    reducers: {
        actualWarmUp: (_state, action: PayloadAction<WarmUp>) => {
            return {
                Days: action.payload.Days
            }
        }
    }
}
)

export default warmUpSlice.reducer

export const { actualWarmUp } = warmUpSlice.actions