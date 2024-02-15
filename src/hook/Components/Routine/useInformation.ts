import { useAppSelector } from "../../store"
import { useRoutineActions } from "../../useRoutineActions"

const useInformation = () => {
    const { name, surname, Routines } = useAppSelector(state => state.user)
    const routine = useAppSelector(state => state.routine)
    const { routineActual } = useRoutineActions()
    const routineId = Routines[0].id

    return { name, surname, routine, routineActual, routineId }
}

export default useInformation