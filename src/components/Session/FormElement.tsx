import { onChange } from "../../services/form/onChange";
import { Elements } from "../../types";

export default function FormElement({ labelName, type, name, setInputs }: Elements) {
    return (
        <label>
            {labelName}:
            <input type={type} name={name} onChange={(event) => onChange({ event, setInputs })} required={true}></input>
        </label>
    )
}