/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from "./Table";
import addWeek from "../../services/routine/addWeek";
import createExerciseInputs from "../../services/routine/exercises/formCreate/craeteExerciseInputs";
import addExerciseFunction from "../../services/routine/exercises/addExercise";
import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import useInformation from "../../hook/Components/Routine/useInformation";
import useGetRoutine from "../../hook/Components/Routine/useGetRoutine";

export default function Routine() {
    const { name, routine, routineActual, routineId, surname } = useInformation()
    const { addExercise, setAddExercise, inputs, setInputs } = useCreaetExercise()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    useGetRoutine()

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
                                        <button>Crear</button>
                                        <button onClick={() => setAddExercise(!addExercise)}>Cancelar</button>
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
            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
            {addDay && pag == 0 ?
                <div>
                    Día número {routine.Days?.length ? routine.Days?.length + 1 : <></>}
                    <label>
                        Cantidad de ejercicios:
                        <input name="exercises" onChange={(e) => setTotalExercise(e.target.value)}></input>
                    </label>
                    <button onClick={() => {
                        setPag(prev => prev + 1)
                    }
                    }>Siguiente</button>
                </div>
                :
                pag < Number(totalExercise) + 1 ?
                    <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                    :
                    <TableConfirmDay
                        key={routineId}
                        dayCreate={dayCreate}
                        routineActual={routineActual}
                        routineId={routineId}
                        setAddDay={setAddDay}
                        setDayCreate={setDayCreate}
                        setPag={setPag}
                        setTotalExercise={setTotalExercise}
                    />
            }
        </>
    )
}