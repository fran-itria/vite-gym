import { onChangeProps } from "../typeServices";

export default function ({ event, setInputs }: onChangeProps) {
  const name = event.target.name;
  const value = event.target.value;
  setInputs((prevInputs) => {
    return { ...prevInputs, [name]: value };
  });
}
