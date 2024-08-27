import { useEffect, useState } from "react"
import useDayCreate from "../../hook/Components/Routine/useCreateDay"
import FormOneDay from "./CraeteOneDay/FormOneDay"
import FormTotalExercise from "./FormTotalExercise"
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay"
import confirmRoutine from "../../services/routine/confirmRoutine"
import { CreateRoutineComponentProps } from "../../types"
import { useAppSelector } from "../../hook/store"

export default function CreateRoutine({
    updateRoutinesUser,
    setUsers,
    setOpenCreateRouitine,
    userId,
    gymName,
    createWarm,
    updateWarmUpUser,
    updateIdGlobal,
    id,
    setLoader
}: CreateRoutineComponentProps) {
    const [totalDays, setTotalDays] = useState<string>('0')
    const [pagDays, setPagDays] = useState<number>(0)
    const { pag, setPag, totalExercise, setTotalExercise, dayCreate, setDayCreate, addDay, setAddDay } = useDayCreate()
    const [routine, setRoutine] = useState<[] | { day: number, exercises: { exercise?: number; name?: string; series?: string; reps?: string; link?: string }[] }[]>([])
    const { email } = useAppSelector(state => state.user)

    return (
        <div style={{ background: 'white', height: '200px' }}>
            {
                pagDays == 0 ?
                    <label style={{ color: 'black' }}>
                        Días a realizar:
                        <input onChange={(e) => setTotalDays(e.target.value)} style={{ borderColor: 'black', borderStyle: 'solid' }}></input>
                        <button onClick={() => {
                            setAddDay(!addDay)
                            setPagDays(pagDays + 1)
                        }}>Siguiente</button>
                        <button onClick={() => setOpenCreateRouitine(false)}>Cancelar</button>
                    </label>
                    :
                    <></>
            }
            {
                pagDays != 0 && pagDays < Number(totalDays) + 1 ?
                    <div>
                        {addDay ?
                            <FormTotalExercise
                                setAddDay={setAddDay}
                                setPag={setPag}
                                setTotalExercise={setTotalExercise}
                                pagDays={pagDays}
                                setPagDays={setPagDays}
                                setTotalDays={setTotalDays}
                                setOpenCreateRouitine={setOpenCreateRouitine} />
                            :
                            pag != 0 && pag < Number(totalExercise) + 1 ?
                                <FormOneDay
                                    actualExercise={pag}
                                    setDayCreate={setDayCreate}
                                    setPag={setPag}
                                    setOpenCreateRouitine={setOpenCreateRouitine}
                                />
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
                                    setLoader={setLoader}
                                    setOpenCreateRouitine={setOpenCreateRouitine}
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
                                    <th>Link de video</th>
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
                                                        <td>{exercise.link ? exercise.link : <></>}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    })}
                                </tbody>
                            </table>
                            <button onClick={() => {
                                confirmRoutine({
                                    updateRoutinesUser,
                                    updateIdGlobal,
                                    updateWarmUpUser,
                                    setOpenCreateRouitine,
                                    userId,
                                    days: routine,
                                    createWarm,
                                    setUsers,
                                    gymName,
                                    id,
                                    setLoader,
                                    email
                                })
                            }}>
                                {!createWarm ? 'Crear rutina' : 'Crear calentamiento'}
                            </button>
                            <button onClick={() => {
                                setOpenCreateRouitine(false)
                            }}>Cancelar</button>
                        </>
                        :
                        <></>
            }
        </div>
    )
}