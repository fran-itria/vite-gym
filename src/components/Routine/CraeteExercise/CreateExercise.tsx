import useCreaetExercise from "../../../hook/Components/Routine/useCreateExercise";
import addExerciseFunction from "../../../services/routine/exercises/addExercise";
import createExerciseInputs from "../../../services/routine/exercises/formCreate/craeteExerciseInputs";
import { CreateExerciseComponentProps } from "../../../types";

export default function CreateExercise({ setAddExercise, day, routineActual, routineId, warmUpActual, warmUpId }: CreateExerciseComponentProps) {
    const { inputs, setInputs } = useCreaetExercise()
    return (
        <form
            style={{ border: 'solid, red, 5px', borderRadius: '50px', display: 'flex', flexDirection: 'column', position: 'absolute' }}
            onSubmit={(e) => {
                if (routineActual && routineId) {
                    addExerciseFunction({
                        e,
                        dayId: day.id,
                        exercise: day.Exercises.length + 1,
                        inputs,
                        routineId,
                        setAddExercise,
                        routineActual
                    })
                } else if (warmUpId && warmUpActual) addExerciseFunction({
                    e,
                    dayId: day.id,
                    exercise: day.Exercises.length + 1,
                    inputs,
                    warmUpId,
                    warmUpActual,
                    setAddExercise
                })
            }}
        >
            <label>
                Nombre del ejercicio:
                <input name="exerciseName" onChange={(e) => createExerciseInputs({ e, setInputs })}></input>
            </label>
            <label>
                Series:
                <input name="series" onChange={(e) => createExerciseInputs({ e, setInputs })}></input>
            </label>
            <label>
                Repeticiones:
                <input name="reps" onChange={(e) => createExerciseInputs({ e, setInputs })}></input>
            </label>
            <button >Crear</button>
            <button onClick={() => setAddExercise(prev => !prev)}>Cancelar</button>
        </form>
    )
}