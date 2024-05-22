import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type meal = {
    id: string,
    date: string,
    hour: string,
    moment: string,
    food: string,
}

export type extraTraining = {
    id: string
    date: Date,
    hour: string,
    exercise: string,
    duration: string | null,
    distance: number | null,
}

export type shift = {
    id: string,
    day: string,
    hour: string
}

export type payments = {
    id: string,
    date: string,
    hour: string,
    amount: number,
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
    photo: string | null
    Routines: { id: string }[] | []
    WarmUps: { id: string }[] | [],
    Meals: meal[] | [],
    ExtraTrainings: extraTraining[] | [],
    Shifts: shift[] | [],
    Payments: payments[] | []
}

export interface RoutinesUser {
    Routines: { id: string }[] | []
}
export interface WarmUpsUser {
    WarmUps: { id: string }[] | []
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
    photo: null,
    Routines: [],
    WarmUps: [],
    ExtraTrainings: [],
    Meals: [],
    Shifts: [],
    Payments: []
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
                photo: action.payload.photo,
                ExtraTrainings: action.payload.ExtraTrainings,
                Meals: action.payload.Meals,
                Routines: action.payload.Routines,
                Shifts: action.payload.Shifts,
                WarmUps: action.payload.WarmUps,
                Payments: action.payload.Payments
            }
        },
        updateRoutineUser: (state, action: PayloadAction<RoutinesUser>) => {
            return {
                ...state,
                Routines: action.payload.Routines
            }
        },

        updateWarmUpsUser: (state, action: PayloadAction<WarmUpsUser>) => {
            return {
                ...state,
                WarmUps: action.payload.WarmUps
            }
        },

        updateMeals: (state, action: PayloadAction<meal[]>) => {
            return {
                ...state,
                Meals: action.payload
            }
        },

        updateExtraTraining: (state, action: PayloadAction<extraTraining[]>) => {
            return {
                ...state,
                ExtraTrainings: action.payload
            }
        },

        updateShifts: (state, action: PayloadAction<shift[]>) => {
            return {
                ...state,
                Shifts: action.payload
            }
        },

        updatePayments: (state, action: PayloadAction<payments[]>) => {
            return {
                ...state,
                Payments: action.payload
            }
        },

        updateStateSubscription: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                pay: action.payload
            }
        },

        updatePhoto: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                photo: action.payload
            }
        }

    }
})

export default userSlice.reducer

export const {
    updateUser,
    updateRoutineUser,
    updateWarmUpsUser,
    updateMeals,
    updateExtraTraining,
    updateShifts,
    updatePayments,
    updateStateSubscription,
    updatePhoto
} = userSlice.actions