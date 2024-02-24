import { createDayRoutine, createDayWarmUp } from "../../../services/creteDayRoutine/craeteDay";
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
    warmUp,
    warmUpActual,
    warmUpId
}: TableConfirmDayComponentProps) {
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
                    if (routine && routineActual && routineId) {
                        createDayRoutine({ routineId: routineId, dayCreate, routineActual, setAddDay, setDayCreate, setPag, setTotalExercise, routine })
                    } else if (warmUp && warmUpActual && warmUpId) {
                        createDayWarmUp({ dayCreate, setAddDay, setDayCreate, setPag, setTotalExercise, warmUp, warmUpId, warmUpActual })
                    }
                }}>Confirmar</button>
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
        </>
    )
}