/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { subscriptionProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";

export default async function subscription({ link, id, e, setLinkMp, amount, setAmount, setLoader }: subscriptionProps) {
    e.preventDefault()
    try {
        setLoader(`${basicLoaders.save} ${specificLoaders.cahnges}`)
        if (link) {
            const gym = await axios.put('/gym', { id, linkMp: link, amount })
            setLinkMp(gym.data.linkMp)
            setAmount(gym.data.amount)
        } else {
            const gym = await axios.put('/gym', { id, amount })
            setAmount(gym.data.amount)
        }
        setLoader(undefined)
    } catch (error: any) {
        setLoader(undefined)
        window.alert(error.response.data.Error)
    }
}