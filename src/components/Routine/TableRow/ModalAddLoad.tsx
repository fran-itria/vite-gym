import { useState } from "react"
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise"
import { ModalAddLoadComponentProps } from "../../../types"

export default function ModalAddLoad({ id, setOpenLoad, setLoader, weekLoad, routineOrWarmUp }: ModalAddLoadComponentProps) {
    const [inputLoad, setInputLoad] = useState<string>('')

    return (
        <div style={{ border: 'solid, black, 2px', position: 'absolute', top: '50%', right: '50%', background: 'white' }}>
            <label>
                Carga:
                <input onChange={(e) => setInputLoad(e.target.value)}></input>
            </label>
            <button onClick={() => modifiedLoads({
                exerciseId: id,
                load: inputLoad,
                routineId: routineOrWarmUp.routineId,
                routineActual: routineOrWarmUp.routineActual,
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