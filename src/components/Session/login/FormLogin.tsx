import { useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";
import Loader from "../../Loader";
import { loaders } from "../../../const";
import useLoaders from "../../../hook/Components/useLoaders";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions()
  const { create, setCreate } = useLoaders()
  return (
    <>
      {create ?
        <Loader text={loaders.init} />
        :
        <form onSubmit={(event) => {
          onSubmit({ event, inputs, navigate, addUser, setCreate })
        }}>
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
      }
    </>
  );
}
