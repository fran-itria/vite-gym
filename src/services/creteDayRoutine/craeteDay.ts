import axios from "axios";
import { createDayProps } from "../typeServices";

export default async function createDay({ dayCreate, routineActual, routineId, setAddDay, setDayCreate, setPag, setTotalExercise, routine }: createDayProps) {
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