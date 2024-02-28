/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { submitTrainingProps } from "../typeServices";


export default async function submitTraining({event, inputs, id, updateTrainingsUser, setTraining, setCreate, setEdit, trainId, setSave}: submitTrainingProps){
    event.preventDefault()
    try {
        console.log(trainId)
        if(setCreate && setTraining){
            setCreate(true)
            await axios.post('/extra', {...inputs, userId: id})
            const user = await axios.get(`/user/getOneUser/${id}`)
            updateTrainingsUser(user.data)
            setTraining(false)
            setCreate(false)
        } else if(setEdit && trainId && setSave){
            setSave(true)
            await axios.put('/extra', {...inputs, trainingId: trainId})
            const user = await axios.get(`/user/getOneUser/${id}`)
            updateTrainingsUser(user.data)
            setEdit(false)
            setSave(false)
        }
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }

}