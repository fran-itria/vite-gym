import { configureStore } from "@reduxjs/toolkit";
import userReducerUser from "./user/slice"
import useReducerRoutine from './routine/slice'

export const store = configureStore({
    reducer: {
        user: userReducerUser,
        routine: useReducerRoutine
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 