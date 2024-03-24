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
    setLoader
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
        // if (response.status == 200) window.alert('Día creado exitosamente')
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        routineActual(response.data)
        setLoader({ state: false })
    } catch (error) {
        console.log(error)
        window.alert(error)
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
    setLoader
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
        // if (response.status == 200) window.alert('Día de calentamiento creado exitosamente')
        console.log(response.data)
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        warmUpActual(response.data)
        setLoader({ state: false })
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}