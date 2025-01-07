/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteTrainingProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../swartAlert";


export default async function deleteTraining({ id, setLoader, updateTrainingsUser, userId }: deleteTrainingProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.exercise}`)
        await axios.delete(`/extra/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateTrainingsUser(user.data.ExtraTrainings)
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }

}