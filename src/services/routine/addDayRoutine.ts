import { addDayRoutineProps } from "../typeServices"

export default function addDayRoutine({ setRoutine, setAddDay, setDayCreate, setPag, setTotalExercise, dayCreate, setPagDays }: addDayRoutineProps) {
    setRoutine(prev => [...prev, { exercises: dayCreate }])
    setAddDay(true)
    setDayCreate([])
    setPag(0)
    setTotalExercise('0')
    setPagDays(prev => prev + 1)
}