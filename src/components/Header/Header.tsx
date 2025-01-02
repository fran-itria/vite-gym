/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../Loader";
import { useHeader } from "./useHeader";
import { change } from "./functions";
import { basicLoaders } from "../../const";
import ResetPassword from "../ResetPassword/ResetPassword";
import { Modal } from "@mui/material";
import SubHeader from "./SubHeader";
import HeaderAdmin from "./HeaderAdmin";
import HeaderNotAdmin from "./HeaderNotAdmin";
import UpdateImage from "./UpdateImage";
import ChangeGym from "./ChangeGym";

export default function Header() {
    const {
        Gym,
        admin,
        changeGym,
        file,
        gyms,
        id,
        image,
        loader,
        menu,
        name,
        photo,
        surname,
        valueGym,
        navigate,
        setChangeGym,
        setFile,
        setGyms,
        setImage,
        setLoader,
        setMenu,
        setValueGym,
        updatePhotoUser,
        reset,
        setResetPassword
    } = useHeader()

    return (
        <>
            {loader && <Loader text={loader} />}
            <SubHeader
                Gym={Gym}
                id={id}
                menu={menu}
                photo={photo}
                setChangeGym={setChangeGym}
                setImage={setImage}
                setLoader={setLoader}
                setMenu={setMenu}
                setGyms={setGyms}
                updatePhotoUser={updatePhotoUser}
                setResetPassword={setResetPassword}
                navigate={navigate}
                name={name}
                surname={surname}
            />
            {!admin ?
                <HeaderNotAdmin id={id} />
                :
                <HeaderAdmin />
            }
            {(image || (changeGym && gyms.length > 0) || reset) &&
                <Modal
                    open={image || changeGym || reset}
                    className="flex justify-center items-center"
                >
                    <>
                        {image ?
                            <UpdateImage
                                file={file}
                                id={id}
                                name={name}
                                setFile={setFile}
                                setImage={setImage}
                                setLoader={setLoader}
                                setMenu={setMenu}
                                surname={surname}
                                updatePhotoUser={updatePhotoUser}
                            />
                            :
                            changeGym && gyms.length > 0 ?
                                <ChangeGym
                                    gyms={gyms}
                                    id={id}
                                    navigate={navigate}
                                    setChangeGym={setChangeGym}
                                    setLoader={setLoader}
                                    setValueGym={setValueGym}
                                    valueGym={valueGym}
                                />
                                :
                                reset &&
                                <ResetPassword setResetPassword={setResetPassword} />
                        }
                    </>
                </Modal>
            }
        </>
    )
}