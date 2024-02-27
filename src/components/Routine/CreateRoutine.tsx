import { useState } from "react"
import useDayCreate from "../../hook/Components/Routine/useCreateDay"
import FormOneDay from "./CraeteOneDay/FormOneDay"
import FormTotalExercise from "./FormTotalExercise"
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay"
import confirmRoutine from "../../services/routine/confirmRoutine"
import { CreateRoutineComponentProps } from "../../types"

export default function CreateRoutine({
    updateRoutinesUser,
    setUsers,
    setOpenCreateRouitine,
    userId,
    gymName,
    createWarm,
    updateWarmUpUser,
    updateWarmUpIdGlobal,
    updateIdGlobal
}: CreateRoutineComponentProps) {
    const [totalDays, setTotalDays] = useState<string>('0')
    const [pagDays, setPagDays] = useState<number>(0)
    const { pag, setPag, totalExercise, setTotalExercise, dayCreate, setDayCreate, addDay, setAddDay } = useDayCreate()
    const [routine, setRoutine] = useState<[] | { day: number, exercises: { exercise?: number; name?: string; series?: string; reps?: string }[] }[]>([])

    return (
        <div style={{ background: 'white', height: '200px', position: 'absolute', top: '50%', right: '50%' }}>
            {
                pagDays == 0 ?
                    <label>
                        Días a realizar:
                        <input onChange={(e) => setTotalDays(e.target.value)}></input>
                        <button onClick={() => {
                            setAddDay(!addDay)
                            setPagDays(pagDays + 1)
                        }}>Siguiente</button>
                    </label>
                    :
                    <></>
            }
            {
                pagDays != 0 && pagDays < Number(totalDays) + 1 ?
                    <div>
                        {addDay ?
                            <FormTotalExercise setAddDay={setAddDay} setPag={setPag} setTotalExercise={setTotalExercise} pagDays={pagDays} />
                            :
                            pag != 0 && pag < Number(totalExercise) + 1 ?
                                <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                                :
                                <TableConfirmDay
                                    dayCreate={dayCreate}
                                    setAddDay={setAddDay}
                                    setDayCreate={setDayCreate}
                                    setPag={setPag}
                                    setTotalExercise={setTotalExercise}
                                    pagDays={pagDays}
                                    setRoutine={setRoutine}
                                    setPagDays={setPagDays}
                                />
                        }
                    </div>
                    :
                    pagDays > Number(totalDays) ?
                        <>
                            <table>
                                <thead>
                                    <th>Ejercicios</th>
                                    <th>Series</th>
                                    <th>Repeticiones</th>
                                </thead>
                                <tbody>
                                    {routine.map(day => {
                                        return day.exercises.map(exercise => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{exercise.name}</td>
                                                        <td>{exercise.series}</td>
                                                        <td>{exercise.reps}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    })}
                                </tbody>
                            </table>
                            <button onClick={() => {
                                if (!setUsers && !gymName) {
                                    confirmRoutine({ 
                                      updateRoutinesUser,
                                      updateIdGlobal,
                                      updateWarmUpUser, 
                                      updateWarmUpIdGlobal, 
                                      setOpenCreateRouitine,
                                      userId, 
                                      days: routine,
                                      createWarm 
                                    })
                                } else {
                                    confirmRoutine({ 
                                      updateRoutinesUser,
                                      updateIdGlobal,
                                      updateWarmUpUser, 
                                      updateWarmUpIdGlobal, 
                                      setOpenCreateRouitine, 
                                      userId, 
                                      days: routine, 
                                      createWarm, 
                                      setUsers, 
                                      gymName 
                                    })
                                }
                            }}>
                                {!createWarm ? 'Crear rutina' : 'Crear calentamiento'}
                            </button>
                        </>
                        :
                        <></>
            }
        </div>
    )
}