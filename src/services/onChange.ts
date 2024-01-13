import { Inputs } from "../types";

type props = {
  event: React.ChangeEvent<HTMLInputElement>;
  setInputs: React.Dispatch<React.SetStateAction<Inputs | undefined>>;
};

export default function ({ event, setInputs }: props) {
  const name = event.target.name;
  const value = event.target.value;
  setInputs((prevInputs) => {
    return { ...prevInputs, [name]: value };
  });
}
