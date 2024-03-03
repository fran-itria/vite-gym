import { useParams } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import Health from "../Health/Health";
import Resume from "../Resume/Resume";
import Shifts from "../Shifts/Shifts";
import { selects } from "../../const";
import NotFound from "../NotFound";
import { useAppSelector } from "../../hook/store";

export default function Home() {
  const { userId, select } = useParams()
  const { admin } = useAppSelector(state => state.user)

  return (
    <>
      {userId != 'null' ?
        !admin ?
          <>
            <NavHome />
            {select == selects.summary ? <Resume /> : select == selects.miSalud ? <Health /> : < Shifts />}
          </>
          :
          <Shifts />
        :
        <NotFound />
      }
    </>
  );
}
