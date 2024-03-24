/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteTrainingProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";


export default async function deleteTraining({ id, setLoader, updateTrainingsUser, userId }: deleteTrainingProps) {
    try {
        setLoader({ state: true, reason: `${basicLoaders.remove} ${specificLoaders.exercise}` })
        await axios.delete(`/extra/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateTrainingsUser(user.data.ExtraTrainings)
        setLoader({ state: false })
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }

}