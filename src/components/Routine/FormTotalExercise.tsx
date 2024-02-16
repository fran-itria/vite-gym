import useInformation from "../../hook/Components/Routine/useInformation"
import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay }: FormTotalExerciseComponentProps) {
    const { routine } = useInformation()
    return (
        <div>
            Día número {routine.Days?.length ? routine.Days?.length + 1 : 1}
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