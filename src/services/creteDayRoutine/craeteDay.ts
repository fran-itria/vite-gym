/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createDayRoutineProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";

export async function createDayRoutine({
    dayCreate,
    routineActual,
    routineId,
    setAddDay,
    setDayCreate,
    setPag,
    setTotalExercise,
    routine,
    setLoader,
    setRoutineAdmin
}: createDayRoutineProps) {
    try {
        setAddDay(false)
        setLoader(`${basicLoaders.create} ${specificLoaders.day}`)
        if (routine) {
            if (routine.weeks) {
                const response = await axios.post('/rutina/createOneDayRutina', {
                    routineId,
                    day: {
                        day: routine.Days?.length ? routine.Days?.length + 1 : 0,
                        exercises: dayCreate
                    }
                })
                if (setRoutineAdmin) setRoutineAdmin(response.data)
                else if (routineActual) routineActual(response.data)
            }
            else {
                const response = await axios.post('/calentamiento/createOneCalentamiento', {
                    warmUpId: routineId,
                    day: {
                        day: routine.Days?.length ? routine.Days?.length + 1 : 0,
                        exercises: dayCreate
                    }
                })
                if (setRoutineAdmin) setRoutineAdmin(response.data)
                else if (routineActual) routineActual(response.data)
            }
        }
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        setLoader(undefined)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}