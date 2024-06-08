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
    }>>,
    stateButton: string,
    setLimitShift: React.Dispatch<React.SetStateAction<{
        limit: number;
        time: string;
        open: string;
        close: string;
    } | undefined>>
) => {
    e.preventDefault()
    console.log(e)
    try {
        setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.limit}` })
        const { limit, time, open, close } = inputs
        if (stateButton == 'confirm') {
            const response = await axios.put(`/gym`, { limit, time, open, close, id: GymId })
            const data = response.data
            setLimitShift({ limit: data.limit, time: data.time.toString(), open: data.open, close: data.open })
        }
        else if (stateButton == 'reset') {
            await axios.put(`/gym`, { limit: 0, time: 0, open: '', close: '', id: GymId })
            setLimitShift(undefined)
        }
        setLoader({ state: false })
    } catch (error: any) {
        window.alert(error.data.Error)
    }
}