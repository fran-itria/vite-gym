import useInformation from "../../../hook/Components/Routine/useInformation";
import createDay from "../../../services/creteDayRoutine/craeteDay";
import addDayRoutine from "../../../services/routine/addDayRoutine";
import { TableConfirmDayComponentProps } from "../../../types";

export default function TableConfirmDay({ dayCreate, setAddDay, setDayCreate, setPag, setTotalExercise, pagDays, setRoutine, setPagDays }: TableConfirmDayComponentProps) {
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
            {!pagDays ?
                <button onClick={() => {
                    createDay({ routineId: routineId.id, dayCreate, routineActual, setAddDay, setDayCreate, setPag, setTotalExercise })
                }}>Confirmar</button>
                :
                <button onClick={() => {
                    setRoutine && setPagDays ?
                        addDayRoutine({ dayCreate, setAddDay, setDayCreate, setPag, setPagDays, setRoutine, setTotalExercise })
                        :
                        <></>
                }}>
                    Agregar día
                </button >
            }
        </>
    )
}