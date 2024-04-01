/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import axios from "axios";


export default async function uploadImage(nameFile: string, file: File, id: string | null, updatePhotoUser: (photo: string) => void) {
    const storageRef = ref(storage, nameFile)
    try {
        await uploadBytes(storageRef, file)
        const urlImage = await getDownloadURL(storageRef)
        const user = await axios.put('/user', { id, photo: urlImage })
        updatePhotoUser(user.data.photo)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}