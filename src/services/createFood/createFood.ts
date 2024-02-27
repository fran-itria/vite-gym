/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createFoodProps } from "../typeServices";

export default async function createFood({e, id, inputs, setAdd, updateMealsUser, setCreate}: createFoodProps){
    e.preventDefault()
    try {
        setCreate(true)
        await axios.post('/comidas', {...inputs, userId: id})
        const user = await axios.get(`/user/getOneUser/${id}`)
        updateMealsUser(user.data)
        setCreate(false)
        setAdd(false)
    } catch (error: any) {
        console.log(error)
        window.alert(error.response.data.Error)
    }
} 