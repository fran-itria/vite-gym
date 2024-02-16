import useInformation from "../../../hook/Components/Routine/useInformation"
import { useRoutineActions } from "../../../hook/useRoutineActions"
import deleteExercise from "../../../services/routine/exercises/deleteExercise"

export default function ConfirmDelete({ name, id, setConfirmDelete }: {
    name: string | undefined,
    id: string | undefined,
    setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const { routineId } = useInformation()
    const { routineActual } = useRoutineActions()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '5px, solid, black', position: 'absolute', top: '50%', right: '50%' }}>
            <p> Desea eliminar el ejercicio {name} </p>
            <button style={{ background: 'red', color: 'white' }} onClick={() => deleteExercise(id, routineId, routineActual, setConfirmDelete)}>
                Borrar
            </button>
            <button style={{ background: 'green', color: 'white' }} onClick={() => setConfirmDelete(confirmDelete => !confirmDelete)}>
                Cancelar
            </button>
        </div>
    )
}