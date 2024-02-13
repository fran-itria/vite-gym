import { onChangeProps } from "../typeServices";

export function onChange({ event, setInputs }: onChangeProps) {
  const name = event.target.name;
  const value = event.target.value;
  setInputs((prevInputs) => {
    return { ...prevInputs, [name]: value };
  });
}