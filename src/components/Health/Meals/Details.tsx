import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../../../themeIcons/customTheme';
import { useAppSelector } from '../../../hook/store';
import { useUserActions } from '../../../hook/useUserActions';
import { DetailsComponentProps } from '../../../types';
import CreateIcon from '@mui/icons-material/Create';
import deleteFood from '../../../services/createFood/deleteFood';


export default function Details({ meal, setDeleteMeal, setValues, setMealId, setEdit}: DetailsComponentProps){
  const { id } = useAppSelector(state => state.user)
  const { updateMealsUser } = useUserActions()

  return (
      <details>
          <summary>
            {`${meal.date.split('-')[2]} - ${meal.date.split('-')[1]}`}
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
          <ThemeProvider theme={theme}>
            <CreateIcon sx={{color: theme.palette.pencil.main}} onClick={() => {
              setEdit(prev => !prev)
              setMealId(meal.id)
              setValues({date: meal.date, food: meal.food, hour: meal.hour, moment: meal.moment})
            }}/>
            <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => deleteFood({mealId: meal.id, setDeleteMeal, updateMealsUser, id})}/>
          </ThemeProvider>
      </details>
  )
}