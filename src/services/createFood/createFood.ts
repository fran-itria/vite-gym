/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createFoodProps } from "../typeServices";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../swartAlert";

export default async function createFood({ e, id, inputs, setAdd, updateMealsUser, mealId, setEdit, setLoader }: createFoodProps) {
    e.preventDefault()
    try {
        if (setAdd) {
            setAdd(false)
            setLoader(`${basicLoaders.create} ${specificLoaders.meal}`)
            await axios.post('/comidas', { ...inputs, userId: id })
            setLoader(undefined)
        } else if (mealId && setEdit) {
            setLoader(`${basicLoaders.save} ${specificLoaders.meal}`)
            await axios.put('/comidas', { ...inputs, id: mealId })
            setEdit(false)
            setLoader(undefined)
        }
        const user = await axios.get(`/user/getOneUser/${id}`)
        updateMealsUser(user.data.Meals)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
} 