import { useState } from "react";
import { Inputs } from "../../../types";
import onChange from "../../../services/onChange";
import { login } from "../../../services/login";

export default function FormLogin() {
  const [inputs, setInputs] = useState<Inputs>();
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(inputs);
        }}
      >
        <label>
          Usuario:
          <input
            name="user"
            type="text"
            onChange={(event) => onChange({ event, setInputs })}
          ></input>
        </label>
        <label>
          Contraseña:
          <input
            name="password"
            type="password"
            onChange={(event) => onChange({ event, setInputs })}
          ></input>
        </label>
        <button>Enviar</button>
      </form>
    </>
  );
}
