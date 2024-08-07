/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { submitTrainingProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";


export default async function submitTraining({ event, inputs, id, updateTrainingsUser, setTraining, setLoader, setEdit, trainId }: submitTrainingProps) {
    event.preventDefault()
    try {
        if (setTraining) {
            setLoader(`${basicLoaders.create} ${specificLoaders.exercise}`)
            await axios.post('/extra', { ...inputs, userId: id })
            const user = await axios.get(`/user/getOneUser/${id}`)
            updateTrainingsUser(user.data.ExtraTrainings)
            setTraining(false)
            setLoader(undefined)
        } else if (setEdit && trainId) {
            setLoader(`${basicLoaders.save} ${specificLoaders.exercise}`)
            await axios.put('/extra', { ...inputs, trainingId: trainId })
            const user = await axios.get(`/user/getOneUser/${id}`)
            updateTrainingsUser(user.data.ExtraTrainings)
            setEdit(false)
            setLoader(undefined)
        }
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }

}