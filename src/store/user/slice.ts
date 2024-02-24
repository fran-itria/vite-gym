import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type meal = {
    id: string,
    date: string,
    hour: string,
    moment: string,
    food: string,
}

type extraTraining = {
    date: string,
    hour: string,
    exercise: string,
    duration: string | null,
    distance: number | null,
}

type shift = {
    id: string,
    day: string,
    hour: string
}
export interface User {
    id: string | null
    GymId: string | null
    Gym: { name: string } | null
    name: string | null,
    surname: string | null,
    age: number | null,
    dni: number | null,
    password: string | null,
    email: string | null,
    user: string | null,
    phone: number | null,
    contactEmergency: number | null,
    admin: boolean | false,
    pay: boolean | false,
    ban: boolean | false,
    login: boolean | true,
    linkMp: string | null,
    photo: string | null
    Routines: { id: string }[] | []
    WarmUps: { id: string }[] | [],
    Meals: meal[] | [],
    ExtraTrainings: extraTraining[] | [],
    Shifts: shift[] | [],
}

export interface RoutinesUser {
    Routines: { id: string }[] | []
}

const initialState: User = {
    id: null,
    GymId: null,
    Gym: null,
    name: null,
    surname: null,
    age: null,
    dni: null,
    password: null,
    email: null,
    user: null,
    phone: null,
    contactEmergency: null,
    admin: false,
    pay: false,
    ban: false,
    login: true,
    linkMp: null,
    photo: null,
    Routines: [],
    WarmUps: [],
    ExtraTrainings: [],
    Meals: [],
    Shifts: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (_state, action: PayloadAction<User>) => {
            return {
                id: action.payload.id,
                GymId: action.payload.GymId,
                Gym: action.payload.Gym,
                name: action.payload.name,
                surname: action.payload.surname,
                age: action.payload.age,
                dni: action.payload.dni,
                email: action.payload.email,
                admin: action.payload.admin,
                ban: action.payload.ban,
                contactEmergency: action.payload.contactEmergency,
                login: action.payload.login,
                password: action.payload.password,
                pay: action.payload.pay,
                phone: action.payload.phone,
                user: action.payload.user,
                linkMp: action.payload.linkMp,
                photo: action.payload.photo,
                ExtraTrainings: action.payload.ExtraTrainings,
                Meals: action.payload.Meals,
                Routines: action.payload.Routines,
                Shifts: action.payload.Shifts,
                WarmUps: action.payload.Meals,
            }
        },
        updateRoutineUser: (state, action: PayloadAction<RoutinesUser>) => {
            return {
                ...state,
                Routines: action.payload.Routines
            }
        }
    }
})

export default userSlice.reducer

export const { updateUser, updateRoutineUser } = userSlice.actions