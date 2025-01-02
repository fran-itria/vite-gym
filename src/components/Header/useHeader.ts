import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hook/store";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";

export function useHeader() {
    const { name, surname, id, admin, Gym, photo } = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const navigate = useNavigate()
    const [loader, setLoader] = useState<string>()
    const [image, setImage] = useState(false)
    const [file, setFile] = useState<File>()
    const { updatePhotoUser } = useUserActions()
    const [changeGym, setChangeGym] = useState(false)
    const [gyms, setGyms] = useState<{ id: string, name: string }[]>([])
    const [valueGym, setValueGym] = useState<string>()
    const [reset, setResetPassword] = useState(false)

    return {
        name,
        surname,
        id,
        admin,
        Gym,
        photo,
        menu,
        setMenu,
        navigate,
        loader,
        setLoader,
        image,
        setImage,
        file,
        setFile,
        updatePhotoUser,
        changeGym,
        setChangeGym,
        gyms,
        setGyms,
        valueGym,
        setValueGym,
        reset,
        setResetPassword
    }
}