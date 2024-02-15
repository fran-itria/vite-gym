/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../hook/store"
import axios from "axios"
import { useRoutineActions } from "../../hook/useRoutineActions"
import Table from "./Table";
import addWeek from "../../services/routine/addWeek";

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

    useEffect(() => console.log(routine), [routine])
    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days ?
                routine.Days.map((day, i) => {
                    return (
                        <>
                            <details key={day.id}>
                                <summary>Día {i + 1}</summary>
                                <Table day={day} weeks={routine.weeks} />
                                <button onClick={() => addWeek(Routines[0].id, routine.weeks + 1, routineActual)}>+ Semana</button>
                            </details >
                        </>
                    )
                })
                :
                <p>No tienes rutina actualmente</p>
            }
        </>
    )
}