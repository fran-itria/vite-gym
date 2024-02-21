import { useParams } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import Health from "../Health/Health";
import Resume from "../Resume/Resume";
import Shifts from "../Shifts/Shifts";
import { selects } from "../../const";
import NotFound from "../NotFound";

export default function Home() {
  const { userId, select } = useParams()

  return (
    <>
      {userId != 'null' ?
        <>
          <NavHome />
          {select == selects.summary ? <Resume /> : select == selects.miSalud ? <Health /> : < Shifts />}
        </>
        :
        <NotFound />
      }
    </>
  );
}
