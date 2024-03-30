import { useState } from "react"
import { useRoutineActions } from "../../../hook/useRoutineActions"
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise"
import { ModalAddLoadComponentProps } from "../../../types"
import useInformation from "../../../hook/Components/Routine/useInformation"

export default function ModalAddLoad({ id, setOpenLoad, setLoader, weekLoad }: ModalAddLoadComponentProps) {
    const [inputLoad, setInputLoad] = useState<string>('')
    const { routineActual } = useRoutineActions()
    const { routineId } = useInformation()

    return (
        <div style={{ border: 'solid, black, 2px', position: 'absolute', top: '50%', right: '50%', background: 'white' }}>
            <label>
                Carga:
                <input onChange={(e) => setInputLoad(e.target.value)}></input>
            </label>
            <button onClick={() => modifiedLoads({
                exerciseId: id,
                load: inputLoad,
                routineId: routineId.id,
                routineActual,
                setOpenLoad,
                setLoader,
                weekLoad
            })}>
                Agregar
            </button>
            <button onClick={() => setOpenLoad((openLoad) => !openLoad)}>
                Cerrar
            </button>
        </div>
    )
}