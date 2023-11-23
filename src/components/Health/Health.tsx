import { useState } from "react";
import { user } from "../../mock";
import style from "./Health.module.css";
import NavHealth from "./NavHealth";
import { InformationEnum } from "../../types";

export default function Health() {
  const [information, setInformation] = useState<InformationEnum>(
    InformationEnum.meal
  );
  return (
    <>
      <NavHealth information={information} setInformation={setInformation} />
      {information == InformationEnum.meal ? (
        <>
          <ul className={style.days}>
            {user.health.comidas.map((comida) => {
              return <button> Dia {comida.fecha}</button>;
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
