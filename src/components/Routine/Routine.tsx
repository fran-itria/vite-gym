/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Table from "./Table";
import { addWeek, deleteWeek } from "../../services/routine/modifiedWeeks";
import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import useInformation from "../../hook/Components/Routine/useInformation";
import useGetRoutine from "../../hook/Components/Routine/useGetRoutine";
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material";
import theme from "../../themeIcons/modifiedExerciseColors";
import deleteDay from "../../services/routine/deleteDay";
import CreateExercise from "./CraeteExercise/CreateExercise";

export default function Routine() {
    const { name, routine, routineActual, routineId, surname } = useInformation()
    const { addExercise, setAddExercise } = useCreaetExercise()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    useGetRoutine()

    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days?.length && routine.Days?.length > 0 ?
                routine.Days.map((day, i) => {
                    return (
                        <>
                            <details key={day.id}>
                                <summary>
                                    Día {i + 1}
                                </summary>
                                <Table day={day} weeks={routine.weeks} />
                                <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                                <button onClick={() => addWeek(routineId, routine.weeks + 1, routineActual)}>+ Semana</button>
                                <button onClick={() => deleteWeek(routineId, routine.weeks - 1, routineActual)}>- Semana</button>
                                {addExercise ?
                                    <CreateExercise day={day} setAddExercise={setAddExercise} />
                                    :
                                    <></>
                                }
                            </details >
                            <ThemeProvider theme={theme}>
                                <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => deleteDay(day.id, routineId, routineActual)} />
                            </ThemeProvider>
                        </>
                    )
                })
                :
                <p>No tienes rutina actualmente</p>
            }
            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
            {addDay ?
                <div>
                    Día número {routine.Days?.length ? routine.Days?.length + 1 : 1}
                    <label>
                        Cantidad de ejercicios:
                        <input name="exercises" onChange={(e) => setTotalExercise(e.target.value)}></input>
                    </label>
                    <button onClick={() => {
                        setPag(prev => prev + 1)
                        setAddDay(!addDay)
                    }
                    }>Siguiente</button>
                </div>
                :
                pag != 0 ?
                    pag < Number(totalExercise) + 1 ?
                        <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                        :
                        <TableConfirmDay
                            key={routineId}
                            dayCreate={dayCreate}
                            setAddDay={setAddDay}
                            setDayCreate={setDayCreate}
                            setPag={setPag}
                            setTotalExercise={setTotalExercise}
                        />
                    :
                    <></>
            }
        </>
    )
}