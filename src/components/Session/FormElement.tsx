import { onChange } from "../../services/onChange";
import { Elements } from "../../types";

export default function FormElement({ labelName, type, name, setInputs, gyms }: Elements) {
    return (
        !gyms ?
            <label >
                {labelName}:
                <input type={type} name={name} onChange={(event) => onChange({ event, setInputs })}></input>
            </label>
            :
            <select>
                <option></option>
                {gyms?.map(gym => <option value={gym.name}>{gym.name}</option>)}
            </select>
    )
}