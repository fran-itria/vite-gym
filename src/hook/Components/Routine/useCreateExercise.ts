import { useState } from "react"

const useCreaetExercise = () => {
    const [addExercise, setAddExercise] = useState<boolean>(false)
    const [inputs, setInputs] = useState<{ exerciseName: string, series: string, reps: string }>({
        exerciseName: '',
        reps: '',
        series: ''
    })

    return { addExercise, setAddExercise, inputs, setInputs }
}

export default useCreaetExercise