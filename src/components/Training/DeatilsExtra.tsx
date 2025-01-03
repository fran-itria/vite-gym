import { ThemeProvider } from "@mui/material/styles";
import theme, { StyledTableCell, StyledTableRow } from '../../themeIcons/customTheme';
import { InputsCreateTraining, SetLoader } from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from "../../hook/store";
import deleteTraining from "../../services/createTraining/deleteTraining";
import { useUserActions } from "../../hook/useUserActions";
import CreateIcon from '@mui/icons-material/Create';
import { extraTraining } from "../../store/user/slice";
import { Modal, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from "react";

type props = {
    ExtraTrainings: [] | extraTraining[]
    setLoader: SetLoader
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setTrainId: React.Dispatch<React.SetStateAction<string | undefined>>
    setDefaultValues: React.Dispatch<React.SetStateAction<InputsCreateTraining | undefined>>
}

export default function DetailsExtra({ ExtraTrainings, setLoader, setEdit, setTrainId, setDefaultValues }: props) {
    const { id } = useAppSelector(state => state.user)
    const { updateTrainingsUser } = useUserActions()
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [training, setTraining] = useState<string | undefined>(undefined)

    return (
        <>
            <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-h-120'>
                <Table aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align='center'> Día </StyledTableCell>
                            <StyledTableCell align='center'> Ejercicio </StyledTableCell>
                            <StyledTableCell align='center'> Hora </StyledTableCell>
                            <StyledTableCell align='center'> Duración </StyledTableCell>
                            <StyledTableCell align='center'> Distancia </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ExtraTrainings.map((training: extraTraining) => {
                            const day = training.date.split('-')
                            const hour = training.hour.split(':')
                            return <StyledTableRow>
                                <StyledTableCell align='center'>
                                    <ThemeProvider theme={theme}>
                                        <div className='ll:h-15 flex justify-around ll:flex-col ll:justify-between'>
                                            <CreateIcon
                                                className='hover:cursor-pointer'
                                                sx={{ color: theme.palette.pencil.main }}
                                                onClick={() => {
                                                    setEdit(prev => !prev)
                                                    setTrainId(training.id)
                                                    setDefaultValues({
                                                        date: training.date,
                                                        distance: training.distance,
                                                        duration: training.duration,
                                                        exercise: training.exercise,
                                                        hour: training.hour
                                                    })
                                                }} />
                                            <DeleteIcon
                                                className='hover:cursor-pointer'
                                                sx={{ color: theme.palette.tashIcon.light }}
                                                onClick={() => {
                                                    setTraining(training.id)
                                                    setConfirmDelete(prev => !prev)
                                                }
                                                } />
                                        </div>
                                    </ThemeProvider>
                                </StyledTableCell>
                                <StyledTableCell align='center'>{day[2] + ' - ' + day[1]}</StyledTableCell>
                                <StyledTableCell align='center'>{training.exercise}</StyledTableCell>
                                <StyledTableCell align='center'>{hour[0] + ' : ' + hour[1]}</StyledTableCell>
                                <StyledTableCell align='center'>{training.duration}</StyledTableCell>
                                <StyledTableCell align='center'>{training.distance}</StyledTableCell>
                            </StyledTableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {confirmDelete &&
                <Modal open={confirmDelete} className='flex justify-center items-center'>
                    <div className='background p-4 h-32 flex flex-col justify-around'>
                        <div>
                            <b>¿Estás seguro de eliminar este ejercicio?</b>
                        </div>
                        <div className='w-full flex justify-around'>
                            <button
                                className='buttonCancel w-24'
                                onClick={() => setConfirmDelete(false)}>Cancelar</button>
                            <button
                                className='buttonConfirm w-24'
                                onClick={() => {
                                    setLoader('Eliminando comida')
                                    deleteTraining({ id: training, setLoader, updateTrainingsUser, userId: id })
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