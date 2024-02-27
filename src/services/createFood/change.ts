import { InputsCreateFood } from "../../types";

export default function change(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, 
    setInputs: React.Dispatch<React.SetStateAction<InputsCreateFood | undefined>>
    ){
    const name = event.target.name
    const value = event.target.value
    setInputs((prev) => { return {...prev, [name]: value}})
}