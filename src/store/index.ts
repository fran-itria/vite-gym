import { configureStore } from "@reduxjs/toolkit";
import useReducerUser from "./user/slice"
import useReducerRoutine from './routine/slice'
import useRoutienIdGlobal from './routineIdGlobal/slice'

export const store = configureStore({
    reducer: {
        user: useReducerUser,
        routine: useReducerRoutine,
        routineIdGlobal: useRoutienIdGlobal
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 