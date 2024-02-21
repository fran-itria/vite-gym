/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { login } from "../login/login";
import { register } from "../register/register";
import { onSubmitProps } from "../typeServices";

export default async function onSubmit({ event, inputs, navigate, addUser, url, setPending }: onSubmitProps) {
    event.preventDefault();
    try {
        if (!url) {
            setPending(true)
            const response = await login(inputs);
            if (response.status == 200) {
                addUser(response.data.user)
                navigate("/home/resumen");
            }
        } else {
            setPending(true)
            const response = await register({ inputs, url });
            if (response.status == 200) {
                const user = await axios.get(`/user/getOneUser/${response.data.id}`)
                addUser(user.data)
                navigate("/home/resumen");
            }
        }
    } catch (error: any) {
        window.alert(error.response.data.Error);
    }
}