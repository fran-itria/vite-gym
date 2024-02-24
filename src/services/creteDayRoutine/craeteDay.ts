import axios from "axios";
import { createDayRoutineProps, createDayWarmUpProps } from "../typeServices";

export async function createDayRoutine({ dayCreate, routineActual, routineId, setAddDay, setDayCreate, setPag, setTotalExercise, routine }: createDayRoutineProps) {
    try {
        const response = await axios.post('/rutina/createOneDayRutina', {
            routineId,
            day: {
                day: routine.Days?.length ? routine.Days?.length + 1 : 0,
                exercises: dayCreate
            }
        })
        if (response.status == 200) window.alert('Día creado exitosamente')
        setAddDay(false)
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        routineActual(response.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}

export async function createDayWarmUp({ dayCreate, warmUpActual, warmUpId, setAddDay, setDayCreate, setPag, setTotalExercise, warmUp }: createDayWarmUpProps) {
    try {
        const response = await axios.post('/calentamiento/createOneCalentamiento', {
            warmUpId,
            day: {
                day: warmUp.Days?.length ? warmUp.Days?.length + 1 : 0,
                exercises: dayCreate
            }
        })
        if (response.status == 200) window.alert('Día de calentamiento creado exitosamente')
        console.log(response.data)
        setAddDay(false)
        setDayCreate([])
        setPag(0)
        setTotalExercise('0')
        warmUpActual(response.data)
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}