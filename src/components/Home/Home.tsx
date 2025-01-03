import { useParams } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import Health from "../Health/Health";
import Summary from "../Summary/Summary";
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
          <div className="p-4 h-full flex flex-col">
            <NavHome />
            {select == selects.summary ? <Summary /> : select == selects.miSalud ? <Health /> : < Shifts />}
          </div>
          :
          <Shifts />
        :
        <NotFound />
      }
    </>
  );
}
