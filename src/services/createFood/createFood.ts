/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createFoodProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";

export default async function createFood({ e, id, inputs, setAdd, updateMealsUser, mealId, setEdit, setLoader }: createFoodProps) {
    e.preventDefault()
    try {
        if (setAdd) {
            setAdd(false)
            setLoader({ state: true, reason: `${basicLoaders.create} ${specificLoaders.meal}` })
            await axios.post('/comidas', { ...inputs, userId: id })
            setLoader({ state: false })
        } else if (mealId && setEdit) {
            setLoader({ state: true, reason: `${basicLoaders.save} ${specificLoaders.meal}` })
            await axios.put('/comidas', { ...inputs, id: mealId })
            setEdit(false)
            setLoader({ state: false })
        }
        const user = await axios.get(`/user/getOneUser/${id}`)
        updateMealsUser(user.data.Meals)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
} 