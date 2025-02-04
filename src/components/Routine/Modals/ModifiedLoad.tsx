import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise"
import { Routine } from "../../../store/routine/slice"
import { SetLoader } from "../../../types"


type ModifiedLoadProps = {
    setNewLoads: React.Dispatch<React.SetStateAction<string>>
    setLoad: React.Dispatch<React.SetStateAction<string | undefined>>
    setLoader: SetLoader
    routineActual?: (Days: Routine) => void;
    routineId?: string
    id: string
    load: string
    currentLoad: string
}

export default function ModifiedLoad({ setNewLoads, setLoad, setLoader, id, load, routineActual, routineId, currentLoad }: ModifiedLoadProps) {
    return (
        <form
            className="background rounded p-4 flex flex-col"
            onSubmit={(e) => modifiedLoads({
                e,
                id,
                load,
                routineActual,
                routineId,
                setLoad,
                setLoader,
            })}
        >
            <input
                type="text"
                placeholder="Carga"
                required
                onChange={(e) => setNewLoads(e.target.value)}
                defaultValue={currentLoad}
            ></input>
            <div className="flex justify-between mt-3">
                <button
                    className='buttonCancel w-24'
                    type="button"
                    onClick={() => {
                        setLoad(undefined)
                    }}
                >
                    Cancelar
                </button>
                <button
                    className="buttonConfirm w-24"
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}