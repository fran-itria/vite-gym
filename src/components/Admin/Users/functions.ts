import axios from "axios"
import sweetAlert from "../../../services/swartAlert";

// TYPES FUNCTIONS
type getUserFunctionsProps = {
    id: string,
    setRoutinesUser: React.Dispatch<React.SetStateAction<{
        id: string;
    }[] | undefined>>
}

type changeFunctionProps = {
    e: React.ChangeEvent<HTMLInputElement>
    setInputs: React.Dispatch<React.SetStateAction<{
        admin?: boolean;
        pay?: boolean;
        ban?: string | null | boolean;
    } | undefined>>
}
// FUNCTIONS
export const getRoutinesUser = async ({ id, setRoutinesUser }: getUserFunctionsProps) => {
    axios.get(`/user/getOneUser/${id}`)
        .then(response => setRoutinesUser(response.data.Routines))
        .catch(error => sweetAlert(error.message))
}
export const getWarmUpsUser = async ({ id, setRoutinesUser }: getUserFunctionsProps) => {
    axios.get(`/user/getOneUser/${id}`)
        .then(response => setRoutinesUser(response.data.WarmUps))
        .catch(error => sweetAlert(error.message))
}

export const change = ({ e, setInputs }: changeFunctionProps) => {
    const name = e.target.name
    if (name == 'ban') {
        setInputs(prev => { return { ...prev, [name]: e.target.value } })
    } else {
        const value = e.target.checked
        setInputs(prev => { return { ...prev, [name]: value } })
    }
}