/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { deleteTrainingProps } from "../typeServices";


export default async function deleteTraining({id, setDelete, updateTrainingsUser, userId}: deleteTrainingProps){
    try {
        setDelete(true)
        await axios.delete(`/extra/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateTrainingsUser(user.data)
        setDelete(false)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }

}