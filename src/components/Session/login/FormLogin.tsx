import { useEffect, useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";
import Loader from "../../Loader";
import { loaders, storage } from "../../../const";
import useLoaders from "../../../hook/Components/useLoaders";
import { login } from "../../../services/login/login";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions()
  const { create, setCreate } = useLoaders()
  useEffect(() => {
    if (storage.getItem('user') && storage.getItem('password')) {
      const user = storage.getItem('user')
      const password = storage.getItem('password')
      login({ user, password }).then(response => {
        addUser(response.data.user)
        navigate(`/home/${response.data.user.id}/resumen`);
      })
    }
  }, [])

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
