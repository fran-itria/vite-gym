/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { deleteMealProps } from "../../types"
import { basicLoaders, specificLoaders } from "../../const"


export default async function deleteFood({ mealId, setLoader, updateMealsUser, id }: deleteMealProps) {
  try {
    setLoader(`${basicLoaders.remove} ${specificLoaders.meal}`)
    await axios.delete(`/comidas/delete/${mealId}`)
    const user = await axios.get(`/user/getOneUser/${id}`)
    updateMealsUser(user.data.Meals)
    setLoader(undefined)
  } catch (error: any) {
    window.alert(error.response.data.Error)
  }
}