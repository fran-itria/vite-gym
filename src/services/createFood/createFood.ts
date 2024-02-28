/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createFoodProps } from "../typeServices";

export default async function createFood({e, id, inputs, setAdd, updateMealsUser, setCreate, mealId, setEdit, setSave}: createFoodProps){
    e.preventDefault()
    try {
        if(setCreate && setAdd){
            setCreate(true)
            await axios.post('/comidas', {...inputs, userId: id})
            setCreate(false)
            setAdd(false)
        } else if(mealId && setEdit && setSave){
            setSave(true)
            await axios.put('/comidas', {...inputs, id: mealId})
            setEdit(false)
            setSave(false)
        }
        const user = await axios.get(`/user/getOneUser/${id}`)
        updateMealsUser(user.data)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
} 