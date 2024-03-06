import axios from "axios";
import { subscriptionProps } from "../typeServices";

export default async function subscription({ link, id, e, setLinkMp, amount, setAmount }: subscriptionProps) {
    e.preventDefault()
    try {
        const gym = await axios.put('/gym', { id, linkMp: link, amount })
        setLinkMp(gym.data.linkMp)
        setAmount(gym.data.amount)
    } catch (error) {
        console.log(error)
    }

}