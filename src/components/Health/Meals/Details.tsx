import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme, { StyledTableCell, StyledTableRow } from '../../../themeIcons/customTheme';
import { useAppSelector } from '../../../hook/store';
import { useUserActions } from '../../../hook/useUserActions';
import { InputsCreateFood, SetLoader } from '../../../types';
import CreateIcon from '@mui/icons-material/Create';
import deleteFood from '../../../services/createFood/deleteFood';
import { Modal, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { meal } from '../../../store/user/slice';
import { useState } from 'react';

type props = {
  Meals: [] | meal[]
  setLoader: SetLoader
  setValues: React.Dispatch<React.SetStateAction<InputsCreateFood | undefined>>
  setMealId: React.Dispatch<React.SetStateAction<string | undefined>>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Details({ Meals, setLoader, setValues, setMealId, setEdit }: props) {
  const { id } = useAppSelector(state => state.user)
  const { updateMealsUser } = useUserActions()
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [meal, setMeal] = useState<string | undefined>(undefined)

  return (
    <>
      <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-h-120'>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='center'> Comida </StyledTableCell>
              <StyledTableCell align='center'> Día </StyledTableCell>
              <StyledTableCell align='center'> Momento </StyledTableCell>
              <StyledTableCell align='center'> Hora </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Meals.map((meal: meal) => {
              const day = meal.date.split('-')
              const hour = meal.hour.split(':')
              return <StyledTableRow>
                <StyledTableCell align='center'>
                  <ThemeProvider theme={theme}>
                    <div className='ll:h-15 flex justify-around ll:flex-col ll:justify-between'>
                      <CreateIcon
                        className='hover:cursor-pointer'
                        sx={{ color: theme.palette.pencil.main }}
                        onClick={() => {
                          setEdit(prev => !prev)
                          setMealId(meal.id)
                          setValues({ date: meal.date, food: meal.food, hour: meal.hour, moment: meal.moment })
                        }} />
                      <DeleteIcon
                        className='hover:cursor-pointer'
                        sx={{ color: theme.palette.tashIcon.light }}
                        onClick={() => {
                          setMeal(meal.id)
                          setConfirmDelete(prev => !prev)
                        }
                        } />
                    </div>
                  </ThemeProvider>
                </StyledTableCell>
                <StyledTableCell align='center'>{meal.food}</StyledTableCell>
                <StyledTableCell align='center'>{day[2] + ' - ' + day[1]}</StyledTableCell>
                <StyledTableCell align='center'>{meal.moment}</StyledTableCell>
                <StyledTableCell align='center'>{hour[0] + ' : ' + hour[1]}</StyledTableCell>
              </StyledTableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {confirmDelete &&
        <Modal open={confirmDelete} className='flex justify-center items-center'>
          <div className='background p-4 h-32 flex flex-col justify-around'>
            <div>
              <b>¿Estás seguro de eliminar esta comida?</b>
            </div>
            <div className='w-full flex justify-around'>
              <button
                className='buttonCancel w-24'
                onClick={() => setConfirmDelete(false)}>cancelar</button>
              <button
                className='buttonConfirm w-24'
                onClick={() => {
                  setLoader('Eliminando comida')
                  deleteFood({ mealId: meal, setLoader, updateMealsUser, id })
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      }
    </>
  )
}