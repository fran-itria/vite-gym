import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme";
import { createDayRoutine } from "../../../services/creteDayRoutine/craeteDay";
import addDayRoutine from "../../../services/routine/addDayRoutine";
import { TableConfirmDayComponentProps } from "../../../types";
import { useState } from 'react';
import ModifiedExercise from './ModifiedExercise';

export default function TableConfirmDay({
    dayCreate,
    setAddDay,
    setDayCreate,
    setPag,
    setTotalExercise,
    pagDays,
    setRoutine,
    setPagDays,
    routine,
    routineActual,
    routineId,
    setLoader,
    setRoutineAdmin,
    setOpenCreateRouitine
}: TableConfirmDayComponentProps) {

    const [modifiedExercise, setModifiedExercise] = useState<number | undefined>(undefined)
    return (
        <div className={`${!setOpenCreateRouitine && 'background rounded p-4'}`}>
            <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
                <Table aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"> <b>Ejercicios </b></StyledTableCell>
                            <StyledTableCell align="center"> <b>Series </b></StyledTableCell>
                            <StyledTableCell align="center"> <b>Repeticiones </b></StyledTableCell>
                            <StyledTableCell align="center"> <b>Video </b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dayCreate.map(exercise => (
                            <>
                                <StyledTableRow key={exercise.exercise}>
                                    <StyledTableCell align="center" className='w-20'>
                                        <button
                                            className='button p-1.5 w-full'
                                            onClick={() => setModifiedExercise(exercise.exercise)}>
                                            <b>{exercise.name}</b>
                                        </button>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <b>{exercise.series}</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <b>{exercise.reps}</b>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <b>{exercise.link && exercise.link}</b>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex mt-3 w-full justify-around'>
                <button
                    onClick={() => {
                        setPag(0)
                        setAddDay(false)
                        setDayCreate([])
                        if (setOpenCreateRouitine) {
                            setOpenCreateRouitine(false)
                        }
                    }}
                    className='buttonCancel w-24'>
                    Cancelar
                </button>
                {!pagDays ?
                    <button onClick={() => {
                        createDayRoutine({
                            routineId,
                            dayCreate,
                            routineActual,
                            setAddDay,
                            setDayCreate,
                            setPag,
                            setTotalExercise,
                            routine,
                            setLoader,
                            setRoutineAdmin
                        })
                    }}
                        className='buttonConfirm w-24'>
                        Confirmar
                    </button>
                    :
                    <button
                        onClick={() => {
                            setRoutine && setPagDays &&
                                addDayRoutine({ pagDays, dayCreate, setAddDay, setDayCreate, setPag, setPagDays, setRoutine, setTotalExercise })
                        }}
                        className='buttonConfirm w-24'
                    >
                        Agregar día
                    </button>
                }
            </div>
            {modifiedExercise && <ModifiedExercise
                modifiedExercise={modifiedExercise}
                setModifiedExercise={setModifiedExercise}
                dayCreate={dayCreate}
            />}
        </div>
    )
}