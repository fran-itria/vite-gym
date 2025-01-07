import { useState } from "react";
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise";
import { ModalAddLoadComponentProps } from "../../../types";

export default function ModalAddLoad({
  id,
  setOpenLoad,
  setLoader,
  weekLoad,
  routineOrWarmUp,
}: ModalAddLoadComponentProps) {
  const [inputLoad, setInputLoad] = useState<string>("");

  return (
    <div className="background flex flex-col p-4 rounded">
      <input
        autoFocus
        placeholder="Cargar peso"
        onChange={(e) => setInputLoad(e.target.value)}
      ></input>
      <p className="w-52 mt-4 font-bold text-gray-900 dark:text-white text-wrap text-center">
        Coloque una coma ( , ) para separar las cargas de las biserie
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="buttonCancel w-24"
          onClick={() => setOpenLoad((openLoad) => !openLoad)}
        >
          Cancelar
        </button>
        <button
          className="buttonConfirm w-24"
          onClick={() =>
            modifiedLoads({
              exerciseId: id,
              load: inputLoad,
              routineId: routineOrWarmUp.routineId,
              routineActual: routineOrWarmUp.routineActual,
              setOpenLoad,
              setLoader,
              weekLoad,
            })
          }
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
