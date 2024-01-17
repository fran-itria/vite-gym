/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { registerProps } from "../typeServices";
import { baseUrl } from "../../const";

export async function register({ inputs, url }: registerProps): Promise<AxiosResponse<any, any>> {
    if (url?.pathname.includes("admin")) {
        const { gymName }: any = inputs
        await axios.post(`${baseUrl}/gym`, { name: gymName })
        const response = await axios.post(`${baseUrl}/user`, { ...inputs, admin: true })
        return response
    } else {
        const response = await axios.post(`${baseUrl}/user`, inputs)
        return response
    }
}