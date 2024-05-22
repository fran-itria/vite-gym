import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material";
import theme from "../../themeIcons/customTheme";
import deleteDay from "../../services/routine/deleteDay";
import CreateExercise from "./CraeteExercise/CreateExercise";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import Table from "./Table";
import { addWeek } from "../../services/routine/modifiedWeeks";
import { DetailComponenProps } from "../../types";


export default function Detail({ day, i, routineOrWarmUp, setLoader, setRoutineAdmin, caseResolve }: DetailComponenProps) {
    const { addExercise, setAddExercise } = useCreaetExercise()
    const { weeks, routineActual, routineId } = routineOrWarmUp
    return (
        <>
            <details key={day.id}>
                <summary>
                    Día {i + 1}
                </summary>
                <Table
                    day={day}
                    routineOrWarmUp={{ routineActual, routineId, weeks }}
                    setLoader={setLoader}
                    setRoutineAdmin={setRoutineAdmin}
                    caseResolve={caseResolve}
                />
                <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                {weeks && routineActual ?
                    <button onClick={() => addWeek(routineId, weeks + 1, routineActual)}>+ Semana</button>
                    :
                    <></>}
                {addExercise ?
                    <CreateExercise
                        day={day}
                        setAddExercise={setAddExercise}
                        routineId={routineId ? routineId : undefined}
                        routineActual={routineActual ? routineActual : undefined}
                        setLoader={setLoader}
                        setRoutineAdmin={setRoutineAdmin}
                        caseResolve={caseResolve}
                    />
                    :
                    <></>
                }
            </details >
            <ThemeProvider theme={theme}>
                <DeleteIcon
                    sx={{ color: theme.palette.tashIcon.light }}
                    onClick={() => {
                        deleteDay({ caseResolve, id: day.id, routineActual, routineId, setRoutineAdmin })
                    }} />
            </ThemeProvider>
        </>
    )
}