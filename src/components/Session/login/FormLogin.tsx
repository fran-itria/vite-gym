import { useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";
import Loader from "../../Loader";
import { useLoginSession } from "../../../hook/Components/Session/useLoginSession";
import useRoutineIdActions from "../../../hook/useRoutineIdActions";
// import style from "./formLogin.module.css";
import { Modal } from "@mui/material";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions();
  const [loader, setLoader] = useState<string>()
  useLoginSession();
  const { updateIdGlobal } = useRoutineIdActions();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  bg-gray-300 dark:bg-gray-800">
      <Modal open={Boolean(loader)}>
        <>
          {loader && <Loader text={loader} />}
        </>
      </Modal>
      <section className="flex flex-col justify-around h-96 bg-gray-300 dark:bg-gray-800 rounded p-11 shadow-xl shadow-black">
        <h2 className="p-0 m-0 text-black text-2xl font-bold dark:text-white"> Pro Active Center</h2>
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
          className="items-start flex flex-col"
        >
          <input
            name="user"
            type="text"
            placeholder="Usuario"
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
            className="bg-gray-400 placeholder:text-black rounded mb-7 p-1 text-black dark:bg-white"
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
            className="bg-gray-400 placeholder:text-black rounded mb-7 p-1 text-black dark:bg-white dark:placeolder:text-white"
          ></input>
          <button className="bg-gray-600 text-white p-1.5 rounded border-none hover:bg-gray-900">Iniciar sesión</button>
        </form>
        <a onClick={() => navigate("/reset")} className=' hover:text-white cursor-pointer'>
          ¿Olvidaste tu contraseña?
        </a>
      </section>
    </div>
  );
}
