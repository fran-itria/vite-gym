import { useState } from "react";
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise";
import { ModalAddLoadComponentProps } from "../../../types";

export default function ModalAddLoad({
  id,
  setOpenLoad,
  setLoader,
  weekLoad,
  routineActual,
  routineId
}: ModalAddLoadComponentProps) {
  const [inputLoad, setInputLoad] = useState<string>("");

  return (
    <form
      className="background flex flex-col p-4 rounded"
      onSubmit={(e) => modifiedLoads({
        e,
        exerciseId: id,
        load: inputLoad,
        routineId,
        routineActual,
        setOpenLoad,
        setLoader,
        weekLoad,
      })}
    >
      <input
        autoFocus
        placeholder="Cargar peso"
        required
        onChange={(e) => setInputLoad(e.target.value)}
      ></input>
      <p className="w-52 mt-4 font-bold text-gray-900 dark:text-white text-wrap text-center">
        Coloque una coma ( , ) para separar las cargas de las biserie
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="buttonCancel w-24"
          type="button"
          onClick={() => setOpenLoad((openLoad) => !openLoad)}
        >
          Cancelar
        </button>
        <button
          className="buttonConfirm w-24"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
