/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import axios from "axios"
import { useRoutineActions } from "../../hook/useRoutineActions"
import Table from "./Table";

export default function Routine() {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const [weeksLoads, setWeeksLoads] = useState(new Array(8).fill(0))

    const { routineActual } = useRoutineActions()

    useEffect(() => {
        const routine = Routines[0]
        axios.get(`/rutina/${routine?.id}`)
            .then(response => {
                routineActual(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => console.log(weeksLoads), [weeksLoads])

    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days ?
                routine.Days.map((day, i) => {
                    return (
                        <details key={day.id}>
                            <summary>Día {i + 1}</summary>
                            <Table weeksLoads={weeksLoads} day={day} />
                        </details >
                    )
                })
                :
                <p>No tienes rutina actualmente</p>
            }
            <button onClick={() => setWeeksLoads(new Array(weeksLoads.length + 1).fill(0))}>+Semana</button>
        </>
    )
}