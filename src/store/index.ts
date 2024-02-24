import { configureStore } from "@reduxjs/toolkit";
import useReducerUser from "./user/slice"
import useReducerRoutine from './routine/slice'
import useRoutienIdGlobal from './routineIdGlobal/slice'
import useWarmUp from './warmUp/slice'
import useWarmUpId from './warmUpId/slice'

export const store = configureStore({
    reducer: {
        user: useReducerUser,
        routine: useReducerRoutine,
        routineIdGlobal: useRoutienIdGlobal,
        warmup: useWarmUp,
        warmUpId: useWarmUpId
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 