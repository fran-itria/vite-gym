import { configureStore } from "@reduxjs/toolkit";
import useReducerUser from "./user/slice"
import useReducerRoutine from './routine/slice'
import useRoutienIdGlobal from './routineIdGlobal/slice'
import useReducerWarmUp from './warmUp/slice'
import useWarmUpIdGlobal from './warmUpIdGlobal/slice'

export const store = configureStore({
    reducer: {
        user: useReducerUser,
        routine: useReducerRoutine,
        warmUp: useReducerWarmUp,
        routineIdGlobal: useRoutienIdGlobal,
        warmUpIdGlobal: useWarmUpIdGlobal
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 