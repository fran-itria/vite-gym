import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay, pagDays }: FormTotalExerciseComponentProps) {
    return (
        <div>
            Día número {pagDays}
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