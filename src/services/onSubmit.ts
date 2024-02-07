/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "./login/login";
import { register } from "./register/register";
import { onSubmitProps } from "./typeServices";

export default async function onSubmit({ event, inputs, navigate, addUser, url }: onSubmitProps) {
    event.preventDefault();
    try {
        if (!url) {
            const response = await login(inputs);
            if (response.status == 200) {
                addUser(response.data.user)
                navigate("/home");
            }
        } else {
            const response = await register({ inputs, url });
            if (response.status == 200) {
                addUser(response.data)
                navigate("/home");
            }
        }
    } catch (error: any) {
        window.alert(error.response.data.Error);
    }
}