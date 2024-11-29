/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
import { deleteExerciseProps } from "../../typeServices";
import { basicLoaders, specificLoaders } from "../../../const";
import { CaseResolve } from "../../../types";

export default async function deleteExercise({
    idExercise,
    setConfirmDelete,
    routineActual,
    routineId,
    setLoader,
    setRoutineAdmin,
    caseResolve
}: deleteExerciseProps) {
    try {
        setConfirmDelete(confirmDelete => !confirmDelete)
        setLoader(`${basicLoaders.remove} ${specificLoaders.exercise}`)
        await axios.delete(`/ejercicio/delete/${idExercise}`)
        if (setRoutineAdmin && routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const routine = await axios.get(`/calentamiento/${routineId}`)
                routineActual(routine.data)
            }
        }
        if (routineActual) {
            if (caseResolve == CaseResolve.rutina) {
                const routine = await axios.get(`/rutina/${routineId}`)
                routineActual(routine.data)
            }
            else {
                const routine = await axios.get(`/calentamiento/${routineId}`)
                routineActual(routine.data)
            }
        }
        setLoader(undefined)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}