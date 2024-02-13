import { useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { NavLink, useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions()
  return (
    <>
      <form onSubmit={(event) => onSubmit({ event, inputs, navigate, addUser })}>
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
        <NavLink to={"/register"}>Registrarme</NavLink>
      </form>
    </>
  );
}
