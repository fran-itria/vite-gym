/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAppSelector } from "../../hook/store"
import axios from "axios"
import { useRoutineActions } from "../../hook/useRoutineActions"

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
                        <details>
                            <summary>Día {i + 1}</summary>
                        </details >
                    )
                })
                :
                <p>No tienes rutina actualmente</p>}
        </>
    )
}