import { InformationEnum, PropsNavHealth } from "../../types";

export default function NavHealth({ information, setInformation }: PropsNavHealth) {
  return (
    <nav className="w-full flex justify-center ml-2 p-2">
      <ul className="flex justify-around w-1/6 ll:w-full p-2">
        <li
          className={
            information == InformationEnum.meal
              ?
              `
              w-24 
              bg-cyan-900 
              font-bold 
              rounded-full 
              text-gray-200 
              flex 
              justify-center 
              items-center
              border-2 
              border-cyan-900
              `
              :
              `
              hover:cursor-pointer 
              w-24 
              border-2 
              border-cyan-800 
              font-bold 
              rounded-full 
              text-gray-200 
              flex 
              justify-center 
              items-center
              `
          }
          onClick={() => setInformation(InformationEnum.meal)}
        >
          Comidas
        </li>
        <li
          className={
            information == InformationEnum.exercises
              ?
              `
              w-24 
              bg-cyan-900 
              font-bold 
              rounded-full 
              text-gray-200 
              flex 
              justify-center 
              items-center
              border-2 
              border-cyan-900
              `
              :
              `
              hover:cursor-pointer 
              w-24 
              border-2 
              border-cyan-800 
              font-bold 
              rounded-full 
              text-gray-200 
              flex 
              justify-center 
              items-center
              `
          }
          onClick={() => setInformation(InformationEnum.exercises)}
        >
          Ejercicios
        </li>
      </ul>
    </nav >
  );
}
