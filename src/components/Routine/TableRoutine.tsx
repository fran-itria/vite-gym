/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Exercise, TableComponentProps } from '../../types';
import { Modal, TableHead, TableRow } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme, { StyledTableCell, StyledTableRow } from '../../themeIcons/customTheme';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import ModifiedExercise from './Modals/ModifiedExercise';
import ModalAddLoad from './Modals/ModalAddLoad';
import ConfirmDelete from './Modals/ConfirmDelete';
import ModifiedLoad from './Modals/ModifiedLoad';

export default function TableComponent({
    day,
    setLoader,
    setRoutineAdmin,
    setSelectDay,
    addWeek,
    setAddExercise,
    setDeleteDay,
    routineActual,
    routineId,
    weeks
}: TableComponentProps) {

    const [open, setOpen] = useState<boolean>(false)
    const [openLoad, setOpenLoad] = useState<boolean>(false)
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [load, setLoad] = useState<string | undefined>(undefined)
    const [idLoad, setIdLoad] = useState<string>('')
    const [newLoads, setNewLoads] = useState<string>('')
    const [weekLoad, setWeekLoad] = useState<number>(0)
    const [currentExercise, setCurrentExercise] = useState<{
        id: string;
        name?: string;
        series?: number;
        reps?: string;
        link?: string;
    } | undefined>(undefined)

    const totalWeeks = new Array(weeks).fill(0)

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
                            {weeks ? totalWeeks.map((_week, i: number) => <StyledTableCell align="center">Semana {i + 1}</StyledTableCell>) : <></>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {day.Exercises.map((exercise: Exercise) => {
                            const { id, link, name, reps, series, Loads } = exercise
                            const weeksArray = Array.from({ length: Number(weeks) }, (_, i) => Loads && Loads[i] ? Loads[i] : undefined)
                            return (
                                <>
                                    <StyledTableRow key={id}>
                                        <StyledTableCell align="center" className='w-20'>
                                            <ThemeProvider theme={theme}>
                                                <div className='w-full flex justify-center'>
                                                    <CreateIcon onClick={() => {
                                                        setCurrentExercise({ id, name, series, reps, link })
                                                        setOpen(open => !open)
                                                    }} sx={{ color: theme.palette.pencil.main }} />
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
                                        {
                                            Loads && weeksArray && weeksArray?.map((value, index) => {
                                                if (value)
                                                    return (
                                                        <StyledTableCell align="center">
                                                            <button
                                                                className={`button w-full ${setRoutineAdmin && 'opacity-90 pointer-events-none'}`}
                                                                onClick={() => {
                                                                    setLoad(value.loads && value.loads)
                                                                    setIdLoad(value.id ? value.id : '')
                                                                }}>
                                                                {value.loads?.includes(',') ?
                                                                    <div className='flex flex-col'>
                                                                        {value.loads.split(',').map(load => {
                                                                            return <b className='mb-3 last:mb-0'>{load}</b>
                                                                        })}
                                                                    </div>
                                                                    :
                                                                    <b>{value.loads}</b>
                                                                }
                                                            </button>
                                                        </StyledTableCell>
                                                    )
                                                else if (weeksArray.findIndex((e) => e == undefined) == index) {
                                                    return <StyledTableCell align='center'>
                                                        <AddCircleIcon
                                                            className={`${setRoutineAdmin && 'opacity-50 pointer-events-none'}`}
                                                            color="success"
                                                            onClick={() => {
                                                                setOpenLoad(openLoad => !openLoad)
                                                                setWeekLoad(Loads.length + 1)
                                                            }} />
                                                    </StyledTableCell>
                                                } else return <StyledTableCell></StyledTableCell>
                                            })
                                        }
                                    </StyledTableRow >
                                </>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open || openLoad || Boolean(load) || confirmDelete} className='flex flex-col items-center justify-center'>
                <>
                    {open &&
                        <ModifiedExercise
                            key={currentExercise?.id}
                            id={currentExercise?.id}
                            name={currentExercise?.name}
                            series={currentExercise?.series}
                            reps={currentExercise?.reps}
                            link={currentExercise?.link}
                            setOpen={setOpen}
                            setLoader={setLoader}
                            setRoutineAdmin={setRoutineAdmin}
                            routineActual={routineActual}
                            routineId={routineId}
                        />
                    }
                    {openLoad &&
                        <ModalAddLoad
                            key={currentExercise?.id}
                            id={currentExercise?.id}
                            setOpenLoad={setOpenLoad}
                            setLoader={setLoader}
                            weekLoad={weekLoad}
                            routineActual={routineActual}
                            routineId={routineId}
                        />
                    }
                    {confirmDelete &&
                        <ConfirmDelete
                            key={currentExercise?.id}
                            id={currentExercise?.id}
                            name={currentExercise?.name}
                            setConfirmDelete={setConfirmDelete}
                            routineActual={routineActual}
                            routineId={routineId}
                            setLoader={setLoader}
                            setRoutineAdmin={setRoutineAdmin}
                        />
                    }
                    {load &&
                        <ModifiedLoad
                            key={idLoad}
                            id={idLoad}
                            load={newLoads}
                            routineId={routineId}
                            setLoad={setLoad}
                            setLoader={setLoader}
                            setNewLoads={setNewLoads}
                            routineActual={routineActual}
                            currentLoad={load}
                        />}
                </>
            </Modal>
            <div className={`flex justify-center mt-3 ll:${weeks ? "flex-col" : "flex-row"}`}>
                <div className={`flex justify-around ${weeks ? "w-full" : "mr-10"} ll:justify-around`}>
                    <button
                        className={`buttonCancel w-24 ${!weeks && "mr-10"}`}
                        onClick={() => {
                            setDeleteDay(true)
                        }}>
                        🗑️ Día
                    </button>
                    <button className='buttonCancel w-24' onClick={() => setSelectDay(undefined)}>Volver</button>
                </div>
                <div className={`flex ${!weeks ? "w-fit" : "w-full ll:mt-3"} justify-around ll:justify-around `}>
                    <button onClick={() => setAddExercise(prev => !prev)} className=' buttonConfirm w-24'> + Ejercicio</button>
                    {weeks && routineActual &&
                        <button onClick={() => addWeek(routineId, weeks + 1, routineActual)} className='buttonConfirm w-24'>+ Semana</button>
                    }
                </div>
            </div>
        </div >
    )
}