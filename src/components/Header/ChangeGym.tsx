import { NavigateFunction } from "react-router-dom";
import { basicLoaders } from "../../const";
import { change } from "./functions";

type props = {
    setValueGym: (value: React.SetStateAction<string | undefined>) => void
    gyms: {
        id: string;
        name: string;
    }[]
    setChangeGym: (value: React.SetStateAction<boolean>) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
    id: string | null
    valueGym: string | undefined
    navigate: NavigateFunction
}

export default function ChangeGym({
    setValueGym,
    gyms,
    setChangeGym,
    setLoader,
    id,
    navigate,
    valueGym
}: props) {
    return (
        <div className="background p-4 rounded flex flex-col items-center w-64 ll:w-1/2">
            <select onChange={(e) => setValueGym(e.target.value)} className="rounded bg-gray-800 dark:bg-black">
                <option value=''>Selecciona un gym</option>
                {gyms.map((gym: { id: string, name: string }) => <option key={gym.id} value={gym.id}>{gym.name}</option>)}
            </select>
            <div className="flex justify-between w-full mt-3">
                <button
                    onClick={() => setChangeGym(prev => !prev)}
                    className="buttonCancel w-20 mt-2">
                    Cancelar
                </button>
                <button
                    className="buttonConfirm w-20 mt-2"
                    onClick={() => {
                        setLoader(basicLoaders.changeGym)
                        change(id, valueGym, navigate)
                    }}
                >
                    Cambiar
                </button>
            </div>
        </div>
    )
}