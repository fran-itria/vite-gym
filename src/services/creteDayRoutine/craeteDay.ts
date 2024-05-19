/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createDayRoutineProps, createDayWarmUpProps } from "../typeServices";
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
    setRoutineAdmin,
}: createDayRoutineProps) {
    try {
        setAddDay(false)
        setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.day}` })
        const response = await axios.post('/rutina/createOneDayRutina', {
            routineId,
            day: {
                day: routine.Days?.length ? routine.Days?.length + 1 : 0,
                exercises: dayCreate
            }
        })
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        if (setRoutineAdmin) setRoutineAdmin(response.data)
        else if (routineActual) routineActual(response.data)
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}

export async function createDayWarmUp({
    dayCreate,
    warmUpActual,
    warmUpId,
    setAddDay,
    setDayCreate,
    setPag,
    setTotalExercise,
    warmUp,
    setLoader,
    setWarmUpAdmin
}: createDayWarmUpProps) {
    try {
        setAddDay(false)
        setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.day}` })
        const response = await axios.post('/calentamiento/createOneCalentamiento', {
            warmUpId,
            day: {
                day: warmUp.Days?.length ? warmUp.Days?.length + 1 : 0,
                exercises: dayCreate
            }
        })
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        if (setWarmUpAdmin) setWarmUpAdmin(response.data)
        else if (warmUpActual) warmUpActual(response.data)
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}