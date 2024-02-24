import useInformation from "../../hook/Components/Routine/useInformation"
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material";
import theme from "../../themeIcons/customTheme";
import deleteDay from "../../services/routine/deleteDay";
import CreateExercise from "./CraeteExercise/CreateExercise";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import Table from "./Table";
import { addWeek } from "../../services/routine/modifiedWeeks";
import { DetailComponenProps } from "../../types";


export default function Detail({ day, i, routineId, routineActual }: DetailComponenProps) {
    const { routine } = useInformation()
    const { addExercise, setAddExercise } = useCreaetExercise()

    return (
        <>
            <details key={day.id}>
                <summary>
                    Día {i + 1}
                </summary>
                <Table day={day} weeks={routine.weeks} />
                <button onClick={() => setAddExercise(!addExercise)}> + Ejercicio</button>
                <button onClick={() => addWeek(routineId.id, routine.weeks + 1, routineActual)}>+ Semana</button>
                {addExercise ?
                    <CreateExercise
                        day={day}
                        setAddExercise={setAddExercise}
                        routineId={routineId}
                        routineActual={routineActual}
                    />
                    :
                    <></>
                }
            </details >
            <ThemeProvider theme={theme}>
                <DeleteIcon
                    sx={{ color: theme.palette.tashIcon.light }}
                    onClick={() => deleteDay({ id: day.id, routineId: routineId.id, routineActual })} />
            </ThemeProvider>
        </>
    )
}