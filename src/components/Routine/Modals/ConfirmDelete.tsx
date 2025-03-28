import deleteExercise from "../../../services/routine/exercises/deleteExercise"
import { ConfirmDeleteComponentProps } from "../../../types"

export default function ConfirmDelete({
    name,
    id,
    setConfirmDelete,
    routineActual,
    routineId,
    warmUpActual,
    warmUpId,
    setLoader,
    setRoutineAdmin
}: ConfirmDeleteComponentProps) {
    return (
        <div className="background p-4 flex flex-col">
            <p className="mb-3"> Desea borrar <b className="decoration-2 decoration-red-700 underline underline-offset-2">{name}</b> </p>
            <div className="flex justify-between">
                <button
                    className="buttonCancel w-24"
                    onClick={() => setConfirmDelete(confirmDelete => !confirmDelete)}>
                    Cancelar
                </button>
                <button
                    className="button w-24"
                    onClick={() => {
                        if (id) deleteExercise({ idExercise: id, setConfirmDelete, setLoader, routineActual, routineId, warmUpActual, warmUpId, setRoutineAdmin })
                    }}>
                    🗑️ Borrar
                </button>
            </div>
        </div>
    )
}