/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { basicLoaders, specificLoaders } from "../../../const";

export const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputs: (value: React.SetStateAction<{
        limit: number;
        time: number;
        open: string;
        close: string;
    }>) => void) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
}

export const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    inputs: {
        limit: number;
        time: number;
        open: string;
        close: string;
    },
    GymId: string | null,
    setLoader: React.Dispatch<React.SetStateAction<{
        state: boolean;
        reason?: string | undefined;
    }>>
) => {
    e.preventDefault()
    try {
        setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.limit}` })
        const { limit, time, open, close } = inputs
        const response = await axios.put(`/gym`, { limit, time, open, close, id: GymId })
        setLoader({ state: false })
        console.log(response.data)
    } catch (error: any) {
        console.log(error)
        window.alert(error.data.Error)
    }
}