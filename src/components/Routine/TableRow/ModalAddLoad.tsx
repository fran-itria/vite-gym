import { useState } from "react"
import { useAppSelector } from "../../../hook/store"
import { useRoutineActions } from "../../../hook/useRoutineActions"
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise"
import { ModalAddLoadComponentProps } from "../../../types"

export default function ModalAddLoad({ idExercise, setOpenLoad }: ModalAddLoadComponentProps) {
    const [inputLoad, setInputLoad] = useState<string>('')
    const { routineActual } = useRoutineActions()
    const { Routines } = useAppSelector(state => state.user)
    const routineId = Routines[0].id

    return (
        <div style={{ border: 'solid, black, 2px', position: 'absolute', top: '50%', right: '50%', background: 'white' }}>
            <label>
                Carga:
                <input onChange={(e) => setInputLoad(e.target.value)}></input>
            </label>
            <button onClick={() => modifiedLoads({
                exerciseId: idExercise,
                load: inputLoad,
                routineId,
                routineActual,
                setOpenLoad
            })}>
                Agregar
            </button>
            <button onClick={() => setOpenLoad((openLoad) => !openLoad)}>
                Cerrar
            </button>
        </div>
    )
}