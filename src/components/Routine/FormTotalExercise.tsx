
import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay, pagDays, routine, setPagDays, setTotalDays, setOpenCreateRouitine }: FormTotalExerciseComponentProps) {
    return (
        <div>
            Día número {pagDays ? pagDays : routine?.Days?.length ? routine?.Days?.length + 1 : <></>}
            <label>
                Cantidad de ejercicios:
                <input name="exercises" onChange={(e) => setTotalExercise(e.target.value)}></input>
            </label>
            <button onClick={() => {
                setPag(prev => prev + 1)
                setAddDay(addDay => !addDay)
            }
            }>Siguiente</button>
            {setTotalDays &&
                <button onClick={() => {
                    setAddDay(addDay => !addDay)
                    if (setPagDays && setTotalDays) {
                        setPagDays(0)
                        setTotalDays('')
                    }
                }}>Atras</button>
            }
            <button onClick={() => {
                setAddDay(addDay => !addDay)
                if (setOpenCreateRouitine) {
                    setOpenCreateRouitine(false)
                }
            }}>Cancelar</button>
        </div>
    )
}