
import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay, pagDays, routine }: FormTotalExerciseComponentProps) {
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
        </div>
    )
}