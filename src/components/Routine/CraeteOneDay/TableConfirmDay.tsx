import useDayCreate from "../../../hook/Components/Routine/useCreateDay";
import useInformation from "../../../hook/Components/Routine/useInformation";
import createDay from "../../../services/creteDayRoutine/craeteDay";

export default function TableConfirmDay({ dayCreate }: {
    dayCreate: {
        exercise?: number | undefined;
        name?: string | undefined;
        series?: string | undefined;
        reps?: string | undefined;
    }[]
}) {
    const { setAddDay, setDayCreate, setPag, setTotalExercise } = useDayCreate()
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
            <button onClick={() => createDay({ routineId, dayCreate, routineActual, setAddDay, setDayCreate, setPag, setTotalExercise })}>Confirmar</button>
        </>
    )
}