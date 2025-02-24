import { ReactNode, FC, useEffect, useState } from 'react';
import axios from "axios";
import { basicLoaders, storage } from "../const";
import { login } from '../services/login/login';
import { useUserActions } from '../hook/useUserActions';
import { useNavigate } from 'react-router-dom';
import sweetAlert from '../services/swartAlert';
import Loader from './Loader';

export type ProtectedRouteProps = {
    children: ReactNode;
}


const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const [loader, setLoader] = useState<string | undefined>(() => `${basicLoaders.init}`)
    const { addUser } = useUserActions()
    const navigate = useNavigate()
    useEffect(() => {
        const token = storage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `${token}`;
        try {
            login(undefined, token || undefined)
                .then(response => {
                    addUser(response.data.user)
                    setLoader(undefined)
                })
        } catch (error: any) {
            setLoader(undefined)
            navigate('/')
            sweetAlert(error.response.data.error)
        }
        // if (token) {
        //     login(undefined, token)
        //         .then(response => {
        //             addUser(response.data.user)
        //             setLoader(undefined)
        //         })
        //         .catch((_error) => {
        //             setLoader(undefined)
        //             navigate('/')
        //         })
        // } else {
        //     setLoader(undefined)
        //     navigate('/')
        //     sweetAlert('dsajdshsdasjk')
        // }
    }, [])
    return (<>
        {loader ?
            <Loader text={loader} />
            : children}
    </>)
}

export default ProtectedRoute;