import { CreateExerciseInputsProps } from "../../../typeServices"

export default function createExerciseInputs({ e, setInputs }: CreateExerciseInputsProps) {
    const name = e.target.name
    const value = e.target.value
    setInputs(inputs => { return { ...inputs, [name]: value } })
}