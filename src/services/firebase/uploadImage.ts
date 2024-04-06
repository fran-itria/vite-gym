/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import axios from "axios";
import { uploadImageProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";


export default async function uploadImage({ file, id, nameFile, setLoader, updatePhotoUser, setImage, setMenu }: uploadImageProps) {
    const storageRef = ref(storage, nameFile)
    try {
        setLoader({ state: true, reason: `${basicLoaders.up} ${specificLoaders.image}` })
        setImage(false)
        setMenu(false)
        await uploadBytes(storageRef, file)
        const urlImage = await getDownloadURL(storageRef)
        const user = await axios.put('/user', { id, photo: urlImage })
        updatePhotoUser(user.data.photo)
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}