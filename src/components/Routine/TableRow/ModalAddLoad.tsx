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
    <div
      style={{
        border: "solid, black, 2px",
        background: "white",
        color: "black",
      }}
    >
      <label style={{ color: "black" }}>
        Carga:
        <input
          style={{ border: "1px solid black" }}
          onChange={(e) => setInputLoad(e.target.value)}
        ></input>
      </label>
      <button
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
      <button onClick={() => setOpenLoad((openLoad) => !openLoad)}>
        Cerrar
      </button>
    </div>
  );
}
