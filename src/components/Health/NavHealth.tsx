import style from "./Health.module.css";
import { InformationEnum, PropsNavHealth } from "../../types";

export default function NavHealth({ information, setInformation }: PropsNavHealth) {
  return (
    <nav>
      <ul className={style.nav}>
        <li
          className={
            information == InformationEnum.meal ? style.active : style.pending
          }
          onClick={() => setInformation(InformationEnum.meal)}
        >
          Comidas
        </li>
        <li
          className={
            information == InformationEnum.exercises
              ? style.active
              : style.pending
          }
          onClick={() => setInformation(InformationEnum.exercises)}
        >
          Ejercicios
        </li>
      </ul>
    </nav>
  );
}
