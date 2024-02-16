import useInformation from "../../../hook/Components/Routine/useInformation";
import createDay from "../../../services/creteDayRoutine/craeteDay";
import { TableConfirmDayProps } from "../../../types";

export default function TableConfirmDay({ dayCreate, setAddDay, setDayCreate, setPag, setTotalExercise }: TableConfirmDayProps) {
    const { routineId, routineActual } = useInformation()

    return (
        <>
            <table>
                <thead>
                    <th>Ejercicios</th>
                    <th>Series</th>
                    <th>Repeticones</th>
                </thead>
                <tbody>
                    {dayCreate.map(exercise => {
                        return (
                            <tr key={exercise.name}>
                                <td>{exercise.name}</td>
                                <td>{exercise.series}</td>
                                <td>{exercise.reps}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={() => {
                createDay({ routineId, dayCreate, routineActual, setAddDay, setDayCreate, setPag, setTotalExercise })
            }}>Confirmar</button>
        </>
    )
}