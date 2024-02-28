import NavHealth from "./NavHealth";
import { InformationEnum } from "../../types";
import { useState } from "react";
import Meals from "./Meals/Meals";
import Training from "../Training/Training";

export default function Health() {
  const [information, setInformation] = useState<InformationEnum>(InformationEnum.meal)

  return (
    <>
      <NavHealth information={information} setInformation={setInformation} />
      {information == InformationEnum.meal ? (
        <Meals />      
      ) : (
        <Training />
      )}
    </>
  );
}
