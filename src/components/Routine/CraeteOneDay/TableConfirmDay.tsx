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
        <>
            <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
                <Table aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"> Ejercicios </StyledTableCell>
                            <StyledTableCell align="center"> Series </StyledTableCell>
                            <StyledTableCell align="center"> Repeticiones </StyledTableCell>
                            <StyledTableCell align="center"> Video </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dayCreate.map(exercise => (
                            <>
                                <StyledTableRow key={exercise.exercise}>
                                    <StyledTableCell align="center" className='w-20'>
                                        <button
                                            onClick={() => setModifiedExercise(exercise.exercise)}>
                                            {exercise.name}
                                        </button>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {exercise.series}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {exercise.reps}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {exercise.link ? exercise.link : <></>}
                                    </StyledTableCell>
                                </StyledTableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex justify-around mt-3'>
                <button
                    onClick={() => {
                        setPag(0)
                        setAddDay(false)
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
                    }}>
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
        </>
    )
}