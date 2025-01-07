/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { deleteMealProps } from "../../types"
import { basicLoaders, specificLoaders } from "../../const"
import sweetAlert from "../swartAlert"


export default async function deleteFood({ mealId, setLoader, updateMealsUser, id }: deleteMealProps) {
  try {
    setLoader(`${basicLoaders.remove} ${specificLoaders.meal}`)
    await axios.delete(`/comidas/delete/${mealId}`)
    const user = await axios.get(`/user/getOneUser/${id}`)
    updateMealsUser(user.data.Meals)
    setLoader(undefined)
  } catch (error: any) {
    sweetAlert(error.response.data.Error)
  }
}