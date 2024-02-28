import { changeInputsProps } from "../typeServices";

export default function cahngeInputs({event, setInputs}: changeInputsProps){
    const name = event.target.name
    const value = event.target.value
    setInputs(prev => {return {...prev, [name]: value}})
}