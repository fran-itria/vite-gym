import { onChangeInputsProps } from "../../typeServices";

export default function onChangeInputs({ event, setInputsExecise }: onChangeInputsProps) {
    const name = event.target.name
    const value = event.target.value
    setInputsExecise(inputs => { return { ...inputs, [name]: value } })
}