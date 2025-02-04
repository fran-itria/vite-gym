/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Exercise, SetLoader } from '../../../types';
import { Modal, TableHead, TableRow } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme, { StyledTableCell, StyledTableRow } from '../../../themeIcons/customTheme';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConfirmDelete from '../../Routine/Modals/ConfirmDelete';
import { WarmUp } from '../../../store/warmUp/slice';
import ModifiedExerciseWarmUp from '../ModifiedExercise/ModifiedExerciseWarmUp';

interface Props {
    warmUpId: string
    day: {
        id?: string;
        WarmUp?: string | null;
        Exercises: [] | Exercise[]
    }
    setDeleteDay: React.Dispatch<React.SetStateAction<boolean>>
    setSelectDay: React.Dispatch<React.SetStateAction<number | undefined>>
    setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
    setLoader: SetLoader
    warmUpActual: (Days: WarmUp) => void
    setWarmUpAdmin: boolean
}

export default function TableWarmUp({
    warmUpId,
    day,
    setDeleteDay,
    setSelectDay,
    setAddExercise,
    setLoader,
    warmUpActual,
    setWarmUpAdmin
}: Props) {

    const [open, setOpen] = useState<boolean>(false)
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [currentExercise, setCurrentExercise] = useState<{
        id: string;
        name?: string;
        series?: number;
        reps?: string;
        link?: string;
    } | undefined>(undefined)

    return (
        <div className='background p-3 rounded ll:w-96 ll:p-3'>
            <TableContainer className='rounded overflow-auto max-h-full max-w-6xl ll:max-h-110'>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" />
                            <StyledTableCell align="center"><b>Video</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Ejercicio</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Series</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Repeticiones</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {day.Exercises.map((exercise: Exercise) => {
                            const { link, name, series, reps, id } = exercise
                            return (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="center" className='w-20'>
                                        <ThemeProvider theme={theme}>
                                            <div className='w-full flex justify-center'>
                                                <CreateIcon onClick={() => {
                                                    setCurrentExercise({ id, name, series, reps, link })
                                                    setOpen(open => !open)
                                                }
                                                } sx={{ color: theme.palette.pencil.main }} />
                                                <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => {
                                                    setCurrentExercise({ id, name, series, reps, link })
                                                    setConfirmDelete(confirmDelete => !confirmDelete)
                                                }}
                                                    className='ml-3' />
                                            </div>
                                        </ThemeProvider>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {link &&
                                            <a target='_blank' href={link}>
                                                <VisibilityIcon />
                                            </a>
                                        }
                                    </StyledTableCell>
                                    {name?.includes(',') ?
                                        <StyledTableCell align="center">
                                            <div className='flex flex-col'>
                                                {name.split(',').map(name => {
                                                    return <b className='mb-3 last:mb-0'>{name}</b>
                                                })}
                                            </div>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell align="center"><b>{name}</b></StyledTableCell>
                                    }
                                    {String(series).includes(',') ?
                                        <StyledTableCell align="center">
                                            <div className='flex flex-col'>
                                                {String(series).split(',').map(serie => {
                                                    return <b className='mb-3 last:mb-0'>{serie}</b>
                                                })}
                                            </div>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell align="center"><b>{series}</b></StyledTableCell>
                                    }
                                    {reps?.includes(',') ?
                                        <StyledTableCell align="center">
                                            <div className='flex flex-col'>
                                                {reps.split(',').map(rep => {
                                                    return <b className='mb-3 last:mb-0'>{rep}</b>
                                                })}
                                            </div>
                                        </StyledTableCell>
                                        :
                                        <StyledTableCell align="center"><b>{reps}</b></StyledTableCell>
                                    }
                                </StyledTableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open || confirmDelete} className='flex flex-col items-center justify-center'>
                <>
                    {open &&
                        <ModifiedExerciseWarmUp
                            key={currentExercise?.id}
                            exerciseId={currentExercise?.id}
                            warmUpId={warmUpId}
                            name={currentExercise?.name}
                            series={currentExercise?.series}
                            reps={currentExercise?.reps}
                            link={currentExercise?.link}
                            setOpen={setOpen}
                            setLoader={setLoader}
                            setWarmUpAdmin={setWarmUpAdmin}
                            warmUpActual={warmUpActual}
                        />
                    }

                    {confirmDelete &&
                        <ConfirmDelete
                            key={currentExercise?.id}
                            id={currentExercise?.id}
                            name={currentExercise?.name}
                            setConfirmDelete={setConfirmDelete}
                            setLoader={setLoader}
                            setRoutineAdmin={setWarmUpAdmin}
                            warmUpActual={warmUpActual}
                            warmUpId={warmUpId}
                        />
                    }
                </>
            </Modal>
            <div className={`flex justify-center mt-3 ll:"flex-row"`}>
                <div className={`flex justify-around "mr-10"} ll:justify-around`}>
                    <button
                        className={`buttonCancel w-24 "mr-10"`}
                        onClick={() => {
                            setDeleteDay(true)
                        }}>
                        🗑️ Día
                    </button>
                    <button className='buttonCancel w-24' onClick={() => setSelectDay(undefined)}>Volver</button>
                </div>
                <div className={`flex "w-fit" justify-around ll:justify-around `}>
                    <button onClick={() => setAddExercise(prev => !prev)} className=' buttonConfirm w-24'> + Ejercicio</button>
                </div>
            </div>
        </div>
    )
}