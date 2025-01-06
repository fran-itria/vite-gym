import { onChange } from "../../services/form/onChange";
import { Elements } from "../../types";

export default function FormElement({ labelName, type, name, setInputs }: Elements) {
    return (
        <input
            placeholder={labelName}
            type={type}
            name={name}
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
            className="mb-7 ll:w-full"
        ></input>
    )
}