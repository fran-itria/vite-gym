/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import axios from "axios"
import { useRoutineActions } from "../../hook/useRoutineActions"
import Table from "./Table";
import addWeek from "../../services/routine/addWeek";
import createExerciseInputs from "../../services/routine/exercises/formCreate/craeteExerciseInputs";
import addExerciseFunction from "../../services/routine/exercises/addExercise";

export default function Routine() {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = Routines[0].id
    const [addExercise, setAddExercise] = useState<boolean>(false)
    const [inputs, setInputs] = useState<{ exerciseName: string, series: string, reps: string }>({
        exerciseName: '',
        reps: '',
        series: ''
    })

    useEffect(() => {
        axios.get(`/rutina/${routineId}`)
            .then(response => {
                routineActual(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => console.log(routine), [routine])
    useEffect(() => console.log(inputs), [inputs])
    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days ?
                routine.Days.map((day, i) => {
                    return (
                        <>
                            <details key={day.id}>
                                <summary>Día {i + 1}</summary>
                                <Table day={day} weeks={routine.weeks} />
                                <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                                <button onClick={() => addWeek(routineId, routine.weeks + 1, routineActual)}>+ Semana</button>
                                {addExercise ?
                                    <form
                                        style={{ border: 'solid, red, 5px', borderRadius: '50px', display: 'flex', flexDirection: 'column', position: 'absolute' }}
                                        onSubmit={(e) => addExerciseFunction({ e, dayId: day.id, exercise: day.Exercises.length + 1, inputs, routineId, setAddExercise, routineActual })}
                                    >
                                        Id del día {day.id}
                                        <label>
                                            Nombre del ejercicio:
                                            <input name="exerciseName" onChange={(e) => createExerciseInputs(e, setInputs)}></input>
                                        </label>
                                        <label>
                                            Series:
                                            <input name="series" onChange={(e) => createExerciseInputs(e, setInputs)}></input>
                                        </label>
                                        <label>
                                            Repeticiones:
                                            <input name="reps" onChange={(e) => createExerciseInputs(e, setInputs)}></input>
                                        </label>
                                        <button>Crear</button>
                                        <button onClick={() => setAddExercise(!addExercise)}>Cerrar</button>
                                    </form>
                                    :
                                    <></>
                                }
                            </details >
                        </>
                    )
                })
                :
                <p>No tienes rutina actualmente</p>
            }
        </>
    )
}