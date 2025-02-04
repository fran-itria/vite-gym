import deleteDay from "../../services/routine/deleteDay";
import { Routine } from "../../store/routine/slice";
import { WarmUp } from "../../store/warmUp/slice";
import { SetLoader } from "../../types";

type Props = {
    id?: string,
    routineId?: string,
    routineActual?: (Days: Routine) => void
    warmUpId?: string
    warmUpActual?: (Days: WarmUp) => void
    setRoutineAdmin: boolean
    selectDay: number | undefined
    setDeleteDay: React.Dispatch<React.SetStateAction<boolean>>
    setLoader: SetLoader
}

export default function ConfirmDeleteDay({ setLoader, setDeleteDay, id, routineActual, routineId, warmUpActual, warmUpId, setRoutineAdmin, selectDay }: Props) {
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
                    onClick={() => deleteDay({ setLoader, id, routineActual, routineId, warmUpActual, warmUpId, setRoutineAdmin })}
                    className="buttonConfirm w-24"
                >
                    Confirmar
                </button>
            </div>
        </div>
    )
}