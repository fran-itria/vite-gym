import { createDayRoutine } from "../../../services/creteDayRoutine/craeteDay";
import addDayRoutine from "../../../services/routine/addDayRoutine";
import { TableConfirmDayComponentProps } from "../../../types";

export default function TableConfirmDay({
    dayCreate,
    setAddDay,
    setDayCreate,
    setPag,
    setTotalExercise,
    pagDays,
    setRoutine,
    setPagDays,
    routine,
    routineActual,
    routineId,
    setLoader,
    setRoutineAdmin,
    setOpenCreateRouitine
}: TableConfirmDayComponentProps) {
    return (
        <>
            <table>
                <thead>
                    <th>Ejercicios</th>
                    <th>Series</th>
                    <th>Repeticones</th>
                    <th>Link del video</th>
                </thead>
                <tbody>
                    {dayCreate.map(exercise => {
                        return (
                            <tr key={exercise.name}>
                                <td>{exercise.name}</td>
                                <td>{exercise.series}</td>
                                <td>{exercise.reps}</td>
                                <td>{exercise.link ? exercise.link : <></>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {!pagDays ?
                <button onClick={() => {
                    createDayRoutine({
                        routineId,
                        dayCreate,
                        routineActual,
                        setAddDay,
                        setDayCreate,
                        setPag,
                        setTotalExercise,
                        routine,
                        setLoader,
                        setRoutineAdmin
                    })
                }}>Confirmar</button >
                :
                <button onClick={() => {
                    setRoutine && setPagDays ?
                        addDayRoutine({ pagDays, dayCreate, setAddDay, setDayCreate, setPag, setPagDays, setRoutine, setTotalExercise })
                        :
                        <></>
                }}>
                    Agregar día
                </button >
            }
            <button onClick={() => {
                setPag(0)
                setAddDay(false)
                if (setOpenCreateRouitine) {
                    setOpenCreateRouitine(false)
                }
            }}>Cancelar</button>
        </>
    )
}