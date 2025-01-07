/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { basicLoaders, specificLoaders } from "../const";
import { SetLoader } from "../types";
import sweetAlert from "./swartAlert";

export default async function deleteImage(
    setLoader: SetLoader,
    updatePhotoUser: (photo: string) => void,
    id: string | null,
    setMenu: (value: React.SetStateAction<boolean>) => void
) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.image}`)
        setMenu(false)
        await axios.put('/user', { id, photo: '' })
        updatePhotoUser('')
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}