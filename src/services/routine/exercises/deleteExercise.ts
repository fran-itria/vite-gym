/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import { deleteExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";

export default async function deleteExercise({
    idExercise,
    setConfirmDelete,
    routineActual,
    routineId,
    warmUpActual,
    warmUpId,
    setLoader,
    setRoutineAdmin,
    setWarmUpAdmin
}: deleteExerciseProps) {
    try {
        setConfirmDelete(confirmDelete => !confirmDelete)
        setLoader({ state: true, reason: `${basicLoaders.remove} ${specificLoaders.exercise}` })
        await axios.delete(`/ejercicio/delete/${idExercise}`)
        if (setRoutineAdmin) {
            const routine = await axios.get(`/rutina/${routineId}`)
            setRoutineAdmin(routine.data)
        }
        if (setWarmUpAdmin) {
            const routine = await axios.get(`/calentamiento/${warmUpId}`)
            setWarmUpAdmin(routine.data)
        }
        if (routineId && routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        } else if (warmUpId && warmUpActual) {
            const routine = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(routine.data)
        }
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}