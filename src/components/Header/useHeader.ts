import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hook/store";
import { useState } from "react";
import useLoaders from "../../hook/Components/useLoaders";
import { useUserActions } from "../../hook/useUserActions";

export function useHeader() {
    const { pathname } = useLocation()
    const { name, surname, id, admin, Gym, photo } = useAppSelector(state => state.user)
    const [menu, setMenu] = useState<boolean>(false)
    const navigate = useNavigate()
    const { loader, setLoader } = useLoaders()
    const [image, setImage] = useState(false)
    const [file, setFile] = useState<File>()
    const { updatePhotoUser } = useUserActions()
    const [cahngeGym, setChangeGym] = useState(false)
    const [gyms, setGyms] = useState<{ id: string, name: string }[]>([])
    const [valueGym, setValueGym] = useState<string>()
    const [reset, setResetPassword] = useState(false)

    return {
        pathname,
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
        cahngeGym,
        setChangeGym,
        gyms,
        setGyms,
        valueGym,
        setValueGym,
        reset,
        setResetPassword
    }
}