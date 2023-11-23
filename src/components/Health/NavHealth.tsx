import style from "./Health.module.css";
import { InformationEnum } from "./Health";

type props = {
  information: InformationEnum;
  setInformation: React.Dispatch<React.SetStateAction<InformationEnum>>;
};

export default function NavHealth({ information, setInformation }: props) {
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
