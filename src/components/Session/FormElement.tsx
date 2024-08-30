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
            className="bg-gray-700 placeholder:text-white rounded mb-7 p-1 text-black dark:bg-white dark:placeholder:text-black"
        ></input>
    )
}