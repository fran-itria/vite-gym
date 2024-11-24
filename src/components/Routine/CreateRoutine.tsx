import { useState } from "react"
import useDayCreate from "../../hook/Components/Routine/useCreateDay"
import FormOneDay from "./CraeteOneDay/FormOneDay"
import FormTotalExercise from "./FormTotalExercise"
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay"
import confirmRoutine from "../../services/routine/confirmRoutine"
import { CreateRoutineComponentProps } from "../../types"
import { useAppSelector } from "../../hook/store"
import { Modal } from "@mui/material"

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
        <Modal open>
            <div className="bg-transparent w-screen h-screen flex justify-center items-center">
                <div className="
                    p-4 
                    w-96 
                    rounded
                    ll:w-full
                    bg-gradient-to-t
                    from-gray-300
                    via-gray-500
                    to-gray-300 
                    dark:from-gray-800 
                    dark:via-cyan-900 
                    dark:to-gray-800"
                >
                    <p className="text-3xl text-center">Creando {createWarm ? 'calentamiento' : 'rutina'}</p>
                    {
                        pagDays == 0 ?
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <label className="mt-3">
                                        Días a realizar:
                                    </label>
                                    <input onChange={(e) => setTotalDays(e.target.value)} style={{ borderColor: 'black', borderStyle: 'solid' }}></input>
                                </div>
                                <div className="flex justify-around mt-3">
                                    <button
                                        onClick={() => {
                                            setAddDay(!addDay)
                                            setPagDays(pagDays + 1)
                                        }}
                                        className="confirm"
                                    >
                                        Siguiente
                                    </button>
                                    <button
                                        onClick={() => setOpenCreateRouitine(false)}
                                        className="cancel"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
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
            </div>
        </Modal>
    )
}