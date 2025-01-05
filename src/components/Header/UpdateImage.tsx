import uploadImage from "../../services/firebase/uploadImage"
import { SetLoader } from "../../types"

type props = {
    setFile: (value: React.SetStateAction<File | undefined>) => void
    setImage: (value: React.SetStateAction<boolean>) => void
    updatePhotoUser: (photo: string) => void
    setLoader: SetLoader
    setMenu: (value: React.SetStateAction<boolean>) => void
    file: File | undefined
    name: string | null
    surname: string | null
    id: string | null
}

export default function UpdateImage({
    setFile,
    setImage,
    updatePhotoUser,
    setLoader,
    setMenu,
    file,
    name,
    surname,
    id
}: props) {
    return (
        <div className="background p-4 h-auto rounded flex flex-col items-center">
            <input
                type="file"
                onChange={(e) => { setFile(e.target.files ? e.target.files[0] : undefined) }}
                className="
                w-56
                file:flex
                file:mr-2 
                file:p-2
                file:rounded 
                file:border-0
                file:text-sm
                file:text-white
                file:bg-gray-700
                dark:file:bg-cyan-700
                "
            >
            </input>
            {file &&
                <img src={URL.createObjectURL(file)} alt="Uploaded file preview" className="w-40 h-40 mt-2 rounded-full"></img>
            }
            <div className="flex justify-between w-full">
                <button
                    onClick={() => {
                        setImage(prev => !prev)
                        setFile(undefined)
                    }}
                    className="buttonCancel w-24 mt-2">
                    Cancelar
                </button>
                <button
                    className="buttonConfirm w-24 mt-2"
                    onClick={() => uploadImage({ nameFile: `${name} ${surname}`, file, id, updatePhotoUser, setLoader, setImage, setMenu })}
                >
                    Subir
                </button>
            </div>
        </div >
    )
}