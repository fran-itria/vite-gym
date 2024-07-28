import axios from "axios"
import { SetLoader } from "../../../types";
import { Routine } from "../../../store/routine/slice";

// TYPES FUNCTIONS
type getUserFunctionsProps = {
    id: string,
    setRoutinesUser: React.Dispatch<React.SetStateAction<{
        id: string;
    }[] | undefined>>
}

type getOneFunctionProps = getUserFunctionsProps & {
    setId: React.Dispatch<React.SetStateAction<string | undefined>>
    setLoader: SetLoader
    setRoutineAdmin: React.Dispatch<React.SetStateAction<Routine | undefined>>
}

type changeFunctionProps = {
    e: React.ChangeEvent<HTMLInputElement>
    setInputs: React.Dispatch<React.SetStateAction<{
        admin?: boolean;
        pay?: boolean;
        ban?: boolean;
    } | undefined>>
}
// FUNCTIONS
export const getRoutinesUser = async ({ id, setRoutinesUser }: getUserFunctionsProps) => {
    axios.get(`/user/getOneUser/${id}`)
        .then(response => setRoutinesUser(response.data.Routines))
        .catch(error => window.alert(error.message))
}
export const getWarmUpsUser = async ({ id, setRoutinesUser }: getUserFunctionsProps) => {
    axios.get(`/user/getOneUser/${id}`)
        .then(response => setRoutinesUser(response.data.WarmUps))
        .catch(error => window.alert(error.message))
}
export const getOneWarmUp = ({ id, setId, setLoader, setRoutineAdmin }: getOneFunctionProps) => {
    setLoader('Cargando calentamiento')
    axios.get(`/calentamiento/${id}`)
        .then(response => {
            setRoutineAdmin(response.data)
            setLoader(undefined)
            setId(id)
        })
        .catch(error => window.alert(error.data.Error))
}
export const getOneRoutine = ({ id, setId, setLoader, setRoutineAdmin }: getOneFunctionProps) => {
    setLoader('Cargando rutina')
    axios.get(`/rutina/${id}`)
        .then(response => {
            setRoutineAdmin(response.data)
            setLoader(undefined)
            setId(id)
        })
        .catch(error => window.alert(error.data.Error))
}

export const change = ({ e, setInputs }: changeFunctionProps) => {
    const name = e.target.name
    const value = e.target.checked
    setInputs(prev => { return { ...prev, [name]: value } })
}