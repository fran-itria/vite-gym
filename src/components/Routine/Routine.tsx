/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../hook/store"
import axios from "axios"
import { useRoutineActions } from "../../hook/useRoutineActions"
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themeIcons/modifiedExerciseColors";

export default function Routine() {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()

    useEffect(() => {
        const routine = Routines[0]
        axios.get(`/rutina/${routine?.id}`)
            .then(response => {
                routineActual(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        console.log(routine)
    }, [routine])

    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days ?
                routine.Days.map((day, i) => {
                    return (
                        <details key={day.id}>
                            <summary>Día {i + 1}</summary>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ejercicios</th>
                                        <th>Series</th>
                                        <th>Repeticiones</th>
                                        <th>Cargas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.Exercises.map(exercise => {
                                        return (
                                            <tr key={exercise.id}>
                                                <td>{exercise.name}</td>
                                                <td>{exercise.series}</td>
                                                <td>{exercise.reps}</td>
                                                <td>
                                                    {exercise.Loads.map(load => <p>{load.loads}</p>)}
                                                </td>
                                                <td>
                                                    <ThemeProvider theme={theme}>
                                                        <CreateIcon sx={{ color: theme.palette.pencil.main }} />
                                                        <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} />
                                                    </ThemeProvider>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </details >
                    )
                })
                :
                <p>No tienes rutina actualmente</p>}
        </>
    )
}