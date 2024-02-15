
export default function createExerciseInputs(event: React.ChangeEvent<HTMLInputElement>, setInputs: React.Dispatch<React.SetStateAction<{
    exerciseName: string;
    series: string;
    reps: string;
}>>) {
    const name = event.target.name
    const value = event.target.value
    setInputs(inputs => { return { ...inputs, [name]: value } })
}