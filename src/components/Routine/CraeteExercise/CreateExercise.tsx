import useCreaetExercise from "../../../hook/Components/Routine/useCreateExercise";
import addExerciseFunction from "../../../services/routine/exercises/addExercise";
import createExerciseInputs from "../../../services/routine/exercises/formCreate/craeteExerciseInputs";
import { CreateExerciseComponentProps } from "../../../types";

export default function CreateExercise({
    setAddExercise,
    day,
    routineActual,
    routineId,
    setLoader,
    setRoutineAdmin,
    caseResolve
}: CreateExerciseComponentProps) {
    const { inputs, setInputs } = useCreaetExercise()

    return (
        <form
            style={{ border: 'solid, red, 5px', borderRadius: '50px', display: 'flex', flexDirection: 'column', position: 'absolute' }}
            onSubmit={(e) => {
                addExerciseFunction({
                    e,
                    dayId: day.id,
                    exercise: day.Exercises.length + 1,
                    inputs,
                    routineId,
                    setAddExercise,
                    setRoutineAdmin,
                    routineActual,
                    setLoader,
                    caseResolve
                })
            }}
        >
            <label>
                Nombre del ejercicio:
                <input name="exerciseName" onChange={(e) => createExerciseInputs({ e, setInputs })} required></input>
            </label>
            <label>
                Series:
                <input name="series" onChange={(e) => createExerciseInputs({ e, setInputs })} required></input>
            </label>
            <label>
                Repeticiones:
                <input name="reps" onChange={(e) => createExerciseInputs({ e, setInputs })} required></input>
            </label>
            <label>
                Link de video del ejercicio:
                <input type="url" name='link' onChange={(e) => createExerciseInputs({ e, setInputs })}></input>
            </label>
            <button >Crear</button>
            <button onClick={() => setAddExercise(prev => !prev)}>Cancelar</button>
        </form>
    )
}