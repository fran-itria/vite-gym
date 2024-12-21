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
            className="background rounded p-4 flex flex-col h-60 justify-between items-center"
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
            <input
                placeholder="Nombre del ejercicio"
                name="exerciseName"
                onChange={(e) => createExerciseInputs({ e, setInputs })}
                required>

            </input>
            <input
                placeholder="Series:"
                name="series"
                onChange={(e) => createExerciseInputs({ e, setInputs })}
                required>

            </input>
            <input
                placeholder="Repeticiones:"
                name="reps"
                onChange={(e) => createExerciseInputs({ e, setInputs })}
                required>

            </input>
            <input
                placeholder="Link de video del ejercicio"
                type="url"
                name='link'
                onChange={(e) => createExerciseInputs({ e, setInputs })}
            ></input>
            <div className="flex justify-between w-56">
                <button className="buttonCancel w-24" onClick={() => setAddExercise(prev => !prev)}>Cancelar</button>
                <button className="buttonConfirm w-24">Crear</button>
            </div>
        </form>
    )
}