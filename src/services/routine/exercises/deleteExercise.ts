/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import { deleteExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import sweetAlert from "../../swartAlert";

export default async function deleteExercise({
    idExercise,
    setConfirmDelete,
    routineActual,
    routineId,
    warmUpActual,
    warmUpId,
    setLoader,
    setRoutineAdmin,
}: deleteExerciseProps) {
    try {
        setConfirmDelete(confirmDelete => !confirmDelete)
        setLoader(`${basicLoaders.remove} ${specificLoaders.exercise}`)
        await axios.delete(`/ejercicio/delete/${idExercise}`)
        if (setRoutineAdmin) {
            if (routineActual) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else if (warmUpActual) {
                const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
                warmUpActual(warmUp.data)
            }
        }
        if (routineActual) {
            const routine = await axios.get(`/rutina/${routineId}`)
            routineActual(routine.data)
        }
        else if (warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}