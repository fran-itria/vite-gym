/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Exercise, TableComponentProps } from '../../types';
import TableHeadComponent from './TableHead'; './TableHead';
import TableRowComponent from './TableRow/TableRow';

export default function TableComponent({
    day,
    routineOrWarmUp,
    setLoader,
    setRoutineAdmin,
    caseResolve,
    setSelectDay,
    addWeek,
    setAddExercise,
    setDeleteDay
}: TableComponentProps) {

    const { weeks, routineActual, routineId } = routineOrWarmUp

    return (
        <div className='background p-3 rounded ll:w-96 ll:p-3'>
            <TableContainer className='rounded overflow-auto max-h-full max-w-6xl ll:max-h-110'>
                <Table aria-label="customized table">
                    <TableHeadComponent weeks={weeks ? weeks : undefined} />
                    <TableBody>
                        {day.Exercises.map((exercise: Exercise) => {
                            return (
                                <TableRowComponent
                                    key={exercise.id}
                                    id={exercise.id}
                                    name={exercise.name}
                                    series={exercise.series}
                                    reps={exercise.reps}
                                    link={exercise.link}
                                    Loads={exercise.Loads ? exercise.Loads : undefined}
                                    routineOrWarmUp={routineOrWarmUp}
                                    setLoader={setLoader}
                                    setRoutineAdmin={setRoutineAdmin}
                                    caseResolve={caseResolve}
                                />
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
        </div>
    )
}