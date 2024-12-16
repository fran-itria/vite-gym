import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise"
import { Routine } from "../../../store/routine/slice"
import { SetLoader } from "../../../types"


type ModifiedLoadProps = {
    setNewLoads: React.Dispatch<React.SetStateAction<string>>
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    setLoader: SetLoader
    routineActual?: (Days: Routine) => void;
    routineId?: string
    id: string
    load: string
}


export default function ModifiedLoad({ setNewLoads, setLoad, setLoader, id, load, routineActual, routineId }: ModifiedLoadProps) {
    return (
        <div className="background rounded p-4 flex flex-col">
            <input
                type="text"
                placeholder="Carga"
                onChange={(e) => setNewLoads(e.target.value)}
            ></input>
            <div className="flex justify-between mt-3">
                <button
                    className="buttonConfirm w-24"
                    onClick={() =>
                        modifiedLoads({
                            id,
                            load,
                            routineActual,
                            routineId,
                            setLoad,
                            setLoader,
                        })
                    }
                >
                    Guardar
                </button>
                <button
                    className='buttonCancel w-24'
                    onClick={() => {
                        console.log('cancel')
                        setLoad(false)
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}