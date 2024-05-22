import deleteExercise from "../../../services/routine/exercises/deleteExercise"
import { ConfirmDeleteComponentProps } from "../../../types"

export default function ConfirmDelete({
    name,
    id,
    setConfirmDelete,
    routineActual,
    routineId,
    setLoader,
    setRoutineAdmin,
    caseResolve
}: ConfirmDeleteComponentProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '5px, solid, black', position: 'absolute', top: '50%', right: '50%' }}>
            <p> Desea eliminar el ejercicio {name} </p>
            <button style={{ background: 'red', color: 'white' }} onClick={() => {
                if (id) deleteExercise({ idExercise: id, setConfirmDelete, setLoader, routineActual, routineId, setRoutineAdmin, caseResolve })
            }}>
                Borrar
            </button>
            <button style={{ background: 'green', color: 'white' }} onClick={() => setConfirmDelete(confirmDelete => !confirmDelete)}>
                Cancelar
            </button>
        </div>
    )
}