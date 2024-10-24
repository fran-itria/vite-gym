import { useState } from "react";
import { InputsLogin } from "../../../types";
import { onChange } from "../../../services/form/onChange";
import { useNavigate } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import { useUserActions } from "../../../hook/useUserActions";
import Loader from "../../Loader";
import { useLoginSession } from "../../../hook/Components/Session/useLoginSession";
import useRoutineIdActions from "../../../hook/useRoutineIdActions";

export default function FormLogin() {
  const [inputs, setInputs] = useState<InputsLogin>();
  const navigate = useNavigate();
  const { addUser } = useUserActions();
  const [loader, setLoader] = useState<string>()
  useLoginSession();
  const { updateIdGlobal } = useRoutineIdActions();

  return (
    <div className='
      w-full 
      h-full 
      flex 
      flex-col 
      justify-center 
      items-center'
    >
      {loader && <Loader text={loader} />}
      <section className="
      flex 
      flex-col 
      justify-around 
      h-96 
      rounded 
      p-11 
      shadow-xl 
      shadow-black
      bg-gradient-to-t  
      from-gray-300
      via-gray-500
      to-gray-300 
      dark:bg-gradient-to-t 
      dark:from-gray-800
      dark:via-cyan-900
      dark:to-gray-800">
        <h2 className="p-0 m-0 text-gray-800 text-2xl font-bold dark:text-white"> Pro Active Center</h2>
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
            className="bg-gray-700 placeholder:text-white rounded mb-7 p-1 text-black dark:bg-white dark:placeholder:text-black"
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={(event) => onChange({ event, setInputs })}
            required={true}
            className="bg-gray-700 placeholder:text-white rounded mb-7 p-1 text-black dark:bg-white dark:placeholder:text-black"
          ></input>
          <button>Iniciar sesión</button>
        </form>
        <a onClick={() => navigate("/reset")} className='text-gray-800 hover:text-black hover:underline cursor-pointer dark:text-white dark:hover:no-underline	'>
          ¿Olvidaste tu contraseña?
        </a>
      </section>
    </div>
  );
}
