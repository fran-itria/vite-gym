/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createRoutineProps } from "../typeServices";

export default async function createRoutine({ days, userId }: createRoutineProps) {
    const response = await axios.post('/rutina/createRutina', {
        userId,
        days
    })
    if (response.status == 200) {
        const routine = await axios.get(`/rutina/${response.data.id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        if (user.status == 200 && routine.status == 200) {
            /* window.alert('Rutina creada exitosamente')
            actualiceRoutinesUser(user.data)
            console.log(routine.data)
            routineActual(routine.data) */
            return { routine: response.data, user: user.data }
        }
    }
}