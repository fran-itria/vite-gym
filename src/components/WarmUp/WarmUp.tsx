import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { deleteWarmup } from "../../services/routine/deleteRoutine";
import { useEffect, useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import { loaders } from "../../const";
import useWarmUpRoutine from "../../hook/Components/WarmUp/useWarmUpRoutine";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import CreateExercise from "../Routine/CraeteExercise/CreateExercise";
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material";
import theme from "../../themeIcons/customTheme";
import deleteDay from "../../services/routine/deleteDay";

export default function WarmUp() {
    const { WarmUps, id, pending, setPending, updateWarmUpIdGlobal, warmUpActual, warmUpId, warmUp, Gym } = useWarmUpRoutine()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()
    const { addExercise, setAddExercise } = useCreaetExercise()

    useEffect(() => console.log(warmUp), [warmUp])
    useEffect(() => console.log(WarmUps), [WarmUps])
    return (
        <>
            {pending ? <Loader text={loaders.routine} />
                :
                <>
                    <div>
                        <p>Seleccionar Calentamiento:</p>
                        <select onChange={(e) => {
                            setPending(prevPending => !prevPending)
                            updateWarmUpIdGlobal(e.target.value)
                        }}>
                            <option value={warmUpId.id}></option>
                            {WarmUps.map((routine, i: number) => (
                                <option value={routine.id}>
                                    {i !== WarmUps.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                                </option>
                            )
                            )}
                        </select>
                    </div>
                    {warmUp.Days?.length && warmUp.Days?.length > 0 ?
                        <>
                            {warmUp.Days.map((day, i) => {
                                return (
                                    <>
                                        <details key={day.id}>
                                            <summary>
                                                Día {i + 1}
                                            </summary>
                                            <thead>
                                                <tr>
                                                    <th>Ejercicio</th>
                                                    <th>Series</th>
                                                    <th>Repeticiones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {day.Exercises.map((exercise) => {
                                                    return (
                                                        <tr>
                                                            <td>{exercise.name}</td>
                                                            <td>{exercise.series}</td>
                                                            <td> {exercise.reps}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                            <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                                            {addExercise ?
                                                <CreateExercise
                                                    day={day}
                                                    setAddExercise={setAddExercise}
                                                    warmUpId={warmUpId}
                                                    warmUpActual={warmUpActual}
                                                />
                                                :
                                                <></>
                                            }
                                        </details >
                                        <ThemeProvider theme={theme}>
                                            <DeleteIcon
                                                sx={{ color: theme.palette.tashIcon.light }}
                                                onClick={() => deleteDay({ id: day.id, warmUpId: warmUpId.id, warmUpActual })}
                                            />
                                        </ThemeProvider>
                                    </>
                                )
                            })}
                            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                            <button onClick={() => deleteWarmup({ id: warmUpId.id, warmUpActual, userId: id, updateWarmUpUser })}>Borrar rutina</button>
                            <button onClick={() => setCreateWarm(prev => !prev)}> + Calentamiento </button>
                        </>
                        :
                        <>
                            <p>No tienes calentamiento actualmente</p>
                            <button onClick={() => setCreateWarm(!createWarm)}>Crear calentamiento</button>
                        </>
                    }
                </>
            }
            {
                addDay ?
                    <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={warmUp} />
                    :
                    pag != 0 ?
                        pag < Number(totalExercise) + 1 ?
                            <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                            :
                            <TableConfirmDay
                                key={warmUpId.id}
                                dayCreate={dayCreate}
                                setAddDay={setAddDay}
                                setDayCreate={setDayCreate}
                                setPag={setPag}
                                setTotalExercise={setTotalExercise}
                                warmUp={warmUp}
                                warmUpActual={warmUpActual}
                                warmUpId={warmUpId.id}
                            />
                        :
                        <></>
            }
            {
                createWarm ?
                    <CreateRoutine
                        userId={id}
                        setOpenCreateRouitine={setCreateWarm}
                        warmUpActual={warmUpActual}
                        updateWarmUpUser={updateWarmUpUser}
                        createWarm={createWarm}
                        gymName={Gym?.name}
                    />
                    :
                    <></>
            }
        </>
    )
}