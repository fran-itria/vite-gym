import useInformation from "../../hook/Components/Routine/useInformation"
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material";
import theme from "../../themeIcons/modifiedExerciseColors";
import deleteDay from "../../services/routine/deleteDay";
import CreateExercise from "./CraeteExercise/CreateExercise";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import Table from "./Table";
import { addWeek } from "../../services/routine/modifiedWeeks";
import { DetailComponenProps } from "../../types";


export default function Detail({ day, i }: DetailComponenProps) {
    const { routine, routineId, routineActual } = useInformation()
    const { addExercise, setAddExercise } = useCreaetExercise()

    return (
        <>
            <details key={day.id}>
                <summary>
                    Día {i + 1}
                </summary>
                <Table day={day} weeks={routine.weeks} />
                <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                <button onClick={() => addWeek(routineId, routine.weeks + 1, routineActual)}>+ Semana</button>
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
}