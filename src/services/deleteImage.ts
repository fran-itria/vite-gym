/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { basicLoaders, specificLoaders } from "../const";

export default async function deleteImage(
    setLoader: (value: React.SetStateAction<{
        state: boolean;
        reason?: string | undefined;
    }>) => void,
    updatePhotoUser: (photo: string) => void,
    id: string | null,
    setMenu: (value: React.SetStateAction<boolean>) => void
) {
    try {
        setLoader({ state: true, reason: `${basicLoaders.remove} ${specificLoaders.image}` })
        setMenu(false)
        await axios.put('/user', { id, photo: '' })
        updatePhotoUser('')
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}