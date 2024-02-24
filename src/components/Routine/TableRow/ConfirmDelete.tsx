import deleteExercise from "../../../services/routine/exercises/deleteExercise"
import { ConfirmDeleteComponentProps } from "../../../types"

export default function ConfirmDelete({
    name,
    id,
    setConfirmDelete,
    routineActual,
    routineId,
    warmUpActual,
    warmUpId
}: ConfirmDeleteComponentProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '5px, solid, black', position: 'absolute', top: '50%', right: '50%' }}>
            <p> Desea eliminar el ejercicio {name} </p>
            <button style={{ background: 'red', color: 'white' }} onClick={() => {
                if (id && routineId && routineActual) deleteExercise({ idExercise: id, routineId, routineActual, setConfirmDelete })
                else if (id && warmUpId && warmUpActual) deleteExercise({ idExercise: id, warmUpId, warmUpActual, setConfirmDelete })
            }}>
                Borrar
            </button>
            <button style={{ background: 'green', color: 'white' }} onClick={() => setConfirmDelete(confirmDelete => !confirmDelete)}>
                Cancelar
            </button>
        </div>
    )
}