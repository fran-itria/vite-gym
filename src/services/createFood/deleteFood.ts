import axios from "axios"
import { deleteMealProps } from "../../types"


export default async function deleteFood({mealId, setRemove, updateMealsUser, id}: deleteMealProps){
        try {
          setRemove(true)
          await axios.delete(`/comidas/delete/${mealId}`)
          const user = await axios.get(`/user/getOneUser/${id}`)
          updateMealsUser(user.data)
          setRemove(false)
        } catch (error) {
          console.log(error)
      }
}