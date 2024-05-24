/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { login } from "../login/login";
import { register } from "../register/register";
import { onSubmitProps } from "../typeServices";
import { basicLoaders, storage } from "../../const";

export default async function onSubmit({ event, inputs, navigate, addUser, url, setLoader, updateIdGlobal }: onSubmitProps) {
    event.preventDefault();
    try {
        setLoader({ state: true, reason: `${basicLoaders.init}` })
        if (!url) {
            const response = await login(inputs);
            if (response.status == 200 && updateIdGlobal) {
                addUser(response.data.user)
                updateIdGlobal(undefined)
                updateIdGlobal(undefined)
                storage.setItem('user', response.data.user.user)
                storage.setItem('email', response.data.user.email)
                storage.setItem('password', response.data.user.password)
                navigate(`/home/${response.data.user.id}/resumen`);
            }
        } else {
            const response = await register({ inputs, url });
            if (response.status == 200) {
                const user = await axios.get(`/user/getOneUser/${response.data.id}`)
                addUser(user.data)
                navigate(`/home/${user.data.id}/resumen`);
            }
        }
    } catch (error: any) {
        setLoader({ state: false })
        window.alert(error.response.data.Error);
        if (inputs && (error.response.data.Error.includes('Usuario') || error.response.data.Error.includes('Email'))) {
            if ('gymName' in inputs) {
                const gym = await axios.get(`/gym/getGymName/${inputs.gymName}`)
                if (gym.data.Users.length == 0) {
                    await axios.delete(`/gym/delete/${gym.data.id}`)
                    console.log('Gimnasio borrado')
                } else {
                    console.log('Gimnasio en uso')
                }
            }
        }
    }
}