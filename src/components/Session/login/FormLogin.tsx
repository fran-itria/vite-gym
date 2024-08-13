import { useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";
import Loader from "../../Loader";
import useLoaders from "../../../hook/Components/useLoaders";
import { useLoginSession } from "../../../hook/Components/Session/useLoginSession";
import useRoutineIdActions from "../../../hook/useRoutineIdActions";
import style from "./formLogin.module.css";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions();
  const { loader, setLoader } = useLoaders();
  useLoginSession();
  const { updateIdGlobal } = useRoutineIdActions();

  return (
    <div>
      {loader && <Loader text={loader} />}
      <section>
        <h2>Bienvenidos a Pro Active Center</h2>
        <form
          onSubmit={(event) => {
            onSubmit({
              event,
              inputs,
              navigate,
              addUser,
              setLoader,
              updateIdGlobal,
            });
          }}
        >
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
          <button className={style.button}>Iniciar sesión</button>
          <a onClick={() => navigate("/reset")} className={style.a}>
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </section>
    </div>
  );
}
