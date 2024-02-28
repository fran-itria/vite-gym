import axios from "axios"
import { deleteMealProps } from "../../types"


export default async function deleteFood({mealId, setDeleteMeal, updateMealsUser, id}: deleteMealProps){
        try {
          setDeleteMeal(true)
          await axios.delete(`/comidas/delete/${mealId}`)
          const user = await axios.get(`/user/getOneUser/${id}`)
          updateMealsUser(user.data)
          setDeleteMeal(false)
        } catch (error) {
          console.log(error)
      }
}