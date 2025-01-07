import axios from "axios";
import sweetAlert from "../swartAlert";

type props = {
    id: string | null
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    setLinkMp: React.Dispatch<React.SetStateAction<string | undefined>>
    setAmount: React.Dispatch<React.SetStateAction<number | undefined>>
    setLoader: (value: React.SetStateAction<string | undefined>) => void
}

export default async function resetValues({ id, e, setLinkMp, setAmount, setLoader }: props) {
    e.preventDefault()
    try {
        if (id) {
            setLoader(`Reestableciendo`)
            const gym = await axios.put('/gym', { id, linkMp: null, amount: null })
            console.log(gym.data)
            setLinkMp(undefined)
            setAmount(undefined)
            setLoader(undefined)
        }
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.response.data.Error)
    }
}