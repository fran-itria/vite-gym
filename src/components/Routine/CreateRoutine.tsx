import { useState } from "react"
import useDayCreate from "../../hook/Components/Routine/useCreateDay"
import FormOneDay from "./CraeteOneDay/FormOneDay"
import FormTotalExercise from "./FormTotalExercise"
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay"
import confirmRoutine from "../../services/routine/confirmRoutine"
import { CreateRoutineComponentProps } from "../../types"
import { useAppSelector } from "../../hook/store"
import { Modal } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme"

export default function CreateRoutine({
    updateRoutinesUser,
    setUsers,
    setOpenCreateRouitine,
    userId,
    gymName,
    createWarm,
    updateWarmUpUser,
    updateIdGlobal,
    id,
    setLoader,
    setEdit
}: CreateRoutineComponentProps) {
    const [totalDays, setTotalDays] = useState<string>('0')
    const [pagDays, setPagDays] = useState<number>(0)
    const { pag, setPag, totalExercise, setTotalExercise, dayCreate, setDayCreate, addDay, setAddDay } = useDayCreate()
    const [routine, setRoutine] = useState<[] | { day: number, exercises: { exercise?: number; name?: string; series?: string; reps?: string; link?: string }[] }[]>([])
    const { email } = useAppSelector(state => state.user)

    return (
        <Modal open className="flex justify-center items-center">
            <div className="bg-transparent w-full ll:p-1 h-screen flex justify-center items-center">
                <div className="
                    p-4 
                    rounded
                    background
                    w-1/3
                    ll:w-full
                    flex
                    flex-col
                    items-center
                    "
                >
                    <div className="w-full flex justify-center">
                        <p className="text-2xl text-start mb-4 font-bold text-gray-900 dark:text-gray-300">Creando {createWarm ? 'calentamiento' : 'rutina'}</p>
                    </div>
                    {
                        pagDays == 0 &&
                        <div className="flex flex-col justify-start ll:w-full ll:items-center">
                            <input
                                onChange={(e) => setTotalDays(e.target.value)}
                                type="number"
                                placeholder="Días a realizar:"
                                className="w-52"
                            >
                            </input>
                            <div className="flex justify-between mt-3 w-52">
                                <button
                                    onClick={() => setOpenCreateRouitine(false)}
                                    className="buttonCancel w-24"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        setAddDay(!addDay)
                                        setPagDays(pagDays + 1)
                                    }}
                                    className={`${(totalDays == '' || totalDays == '0') && 'opacity-50 pointer-events-none'} buttonConfirm w-24`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    }
                    {
                        pagDays != 0 && pagDays < Number(totalDays) + 1 ?
                            <div>
                                {addDay ?
                                    <FormTotalExercise
                                        setAddDay={setAddDay}
                                        setPag={setPag}
                                        setTotalExercise={setTotalExercise}
                                        pagDays={pagDays}
                                        setPagDays={setPagDays}
                                        setTotalDays={setTotalDays}
                                        setOpenCreateRouitine={setOpenCreateRouitine} />
                                    :
                                    pag != 0 && pag < Number(totalExercise) + 1 ?
                                        <FormOneDay
                                            actualExercise={pag}
                                            setDayCreate={setDayCreate}
                                            setPag={setPag}
                                            setOpenCreateRouitine={setOpenCreateRouitine}
                                            setAddDay={setAddDay}
                                            pag={pag}
                                        />
                                        :
                                        <TableConfirmDay
                                            dayCreate={dayCreate}
                                            setAddDay={setAddDay}
                                            setDayCreate={setDayCreate}
                                            setPag={setPag}
                                            setTotalExercise={setTotalExercise}
                                            pagDays={pagDays}
                                            setRoutine={setRoutine}
                                            setPagDays={setPagDays}
                                            setLoader={setLoader}
                                            setOpenCreateRouitine={setOpenCreateRouitine}
                                        />
                                }
                            </div>
                            :
                            pagDays > Number(totalDays) &&
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
                                            {routine.map(day => {
                                                return (
                                                    <>
                                                        <StyledTableRow key={day.day} className="fullRow">
                                                            <StyledTableCell align="center" colSpan={4} className="bg-cyan-600">
                                                                Día {day.day}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        {day.exercises.map(exercise => {
                                                            return (
                                                                <StyledTableRow key={exercise.exercise}>
                                                                    <StyledTableCell align="center" className='w-20'>
                                                                        {exercise.name}
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
                                                            )
                                                        })}
                                                    </>

                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className="flex justify-around mt-3 w-full">
                                    <button onClick={() => {
                                        setOpenCreateRouitine(false)
                                    }}
                                        className="buttonCancel w-24">
                                        Cancelar
                                    </button>
                                    <button onClick={() => {
                                        confirmRoutine({
                                            updateRoutinesUser,
                                            updateIdGlobal,
                                            updateWarmUpUser,
                                            setOpenCreateRouitine,
                                            userId,
                                            days: routine,
                                            createWarm,
                                            setUsers,
                                            gymName,
                                            id,
                                            setLoader,
                                            email,
                                            setEdit
                                        })
                                    }}
                                        className="buttonConfirm w-24">
                                        Crear
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </Modal >
    )
}