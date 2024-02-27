import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../themeIcons/customTheme';
import { useAppSelector } from '../../../hook/store';
import axios from 'axios';
import { useUserActions } from '../../../hook/useUserActions';
import { DetailsComponentProps } from '../../../types';

export default function Details({ meal, setDeleteMeal}: DetailsComponentProps){
  const { id } = useAppSelector(state => state.user)
  const { updateMealsUser } = useUserActions()

  const deleteMeal = async(mealId: string) => {
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
  return (
      <details>
          <summary>
            {`${meal.date.split('-')[2]} - ${meal.date.split('-')[1]}`}
            <ThemeProvider theme={theme}>
              <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => deleteMeal(meal.id)}/>
            </ThemeProvider>
          </summary>
          <p>
            Hora: {`${meal.hour.split(':')[0]}:${meal.hour.split(':')[1]}`}hs
          </p>
          <p>
            Momento: {meal.moment}
          </p>
          <p>
            Comida: {meal.food}
          </p>
      </details>
  )
}