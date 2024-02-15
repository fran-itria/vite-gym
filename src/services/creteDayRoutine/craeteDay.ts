import axios from "axios";
import { createDayProps } from "../typeServices";

export default async function createDay({ dayCreate, routineActual, routineId, setAddDay, setDayCreate, setPag, setTotalExercise }: createDayProps) {
    try {
        const response = await axios.post('/rutina/createOneDayRutina', { routineId, day: dayCreate })
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