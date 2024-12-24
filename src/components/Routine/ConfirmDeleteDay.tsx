import deleteDay from "../../services/routine/deleteDay";
import { Routine } from "../../store/routine/slice";
import { CaseResolve, SetLoader } from "../../types";

type Props = {
    id?: string,
    routineId?: string,
    routineActual?: (Days: Routine) => void
    setRoutineAdmin?: CaseResolve
    caseResolve: CaseResolve
    selectDay: number | undefined
    setDeleteDay: React.Dispatch<React.SetStateAction<boolean>>
    setLoader: SetLoader
}

export default function ConfirmDeleteDay({ setLoader, setDeleteDay, caseResolve, id, routineActual, routineId, setRoutineAdmin, selectDay }: Props) {
    return (
        <div className="background p-4 rounded w-64 flex flex-col items-center justify-center">
            <b>Desea eliminar el dia {selectDay}</b>
            <div className="flex justify-between mt-3 w-full">
                <button
                    className="buttonCancel w-24"
                    onClick={() => setDeleteDay(false)}
                >
                    Cancelar
                </button>
                <button
                    onClick={() => deleteDay({ setLoader, caseResolve, id, routineActual, routineId, setRoutineAdmin })}
                    className="buttonConfirm w-24"
                >
                    Confirmar
                </button>
            </div>
        </div>
    )
}