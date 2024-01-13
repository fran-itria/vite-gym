import { useState } from "react";
import { Inputs } from "../../../types";
import onChange from "../../../services/login/onChange";
import { useNavigate } from "react-router-dom";
import { onSubmit } from "../../../services/login/onSubmit";

export default function FormLogin() {
  const [inputs, setInputs] = useState<Inputs>();
  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={(event) => onSubmit({ event, inputs, navigate })}>
        <label>
          Usuario:
          <input
            name="user"
            type="text"
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
          ></input>
        </label>
        <label>
          Contraseña:
          <input
            name="password"
            type="password"
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
          ></input>
        </label>
        <button>Enviar</button>
      </form>
    </>
  );
}
