import axios from "axios";
import { subscriptionProps } from "../typeServices";

export default async function subscription({link, id, e}: subscriptionProps){
    e.preventDefault()
    try {
        const gym = await axios.put('/gym', {id, linkMp: link})
        console.log(gym.data)
    } catch (error) {
        console.log(error)
    }

}