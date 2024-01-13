import { useLocation } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import Health from "../Health/Health";
import { miSalud } from "../../const";

export default function Home() {
  const { pathname } = useLocation();
  const route = pathname.split("/")[2];
  return (
    <>
      <NavHome />
      {route == miSalud ? <Health /> : <></>}
    </>
  );
}
