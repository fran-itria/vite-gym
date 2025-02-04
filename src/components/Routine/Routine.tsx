import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import Detail from "./DetailRoutine";
import FormTotalExercise from "./FormTotalExercise";
import { deletRoutine } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import Loader from "../Loader";
import { basicLoaders, specificLoaders } from "../../const";
import { CaseResolve, UsersComponent } from "../../types";
import { Modal } from "@mui/material";
import { useUserActions } from "../../hook/useUserActions";
import QueueIcon from '@mui/icons-material/Queue';
import useRoutine from "./customHook";

interface Props {
    otherUserId?: string
    setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
    setModal?: (value: React.SetStateAction<CaseResolve | undefined>) => void
    setRoutineAdmin: boolean
}

export default function Routine({ otherUserId, setUsers, setModal, setRoutineAdmin }: Props) {
    const [chagenOtherRoutine, setChangeOtherRoutine] = useState<boolean>(false)
    const { Routines, id, loader, routine, routineActual, routineId, setLoader, updateIdGlobal, viewRoutineOtherUser } = useRoutine({ otherUserId, chagenOtherRoutine, setChangeOtherRoutine })
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()

    return (
        <div className={`ll:w-full rounded ${setUsers ? 'background w-1/4 h-1/2' : 'flex flex-col items-center h-full justify-center'} p-4`}>
            {loader && <Loader text={loader} />}
            <div className="flex justify-center items-center">
                <b className="mr-2 dark:text-white text-gray-900">Seleccionar rutina:</b>
                <select
                    className="rounded h-6 text-center bg-gray-700 dark:bg-gray-900"
                    onChange={(e) => {
                        if (viewRoutineOtherUser) {
                            setChangeOtherRoutine(true)
                        }
                        updateIdGlobal(e.target.value)
                        setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                    }}>
                    <option value={routineId}></option>
                    {!viewRoutineOtherUser ?
                        Routines.map((routine, i: number) => (
                            <option value={routine.id} className="font-bold">
                                {i !== Routines.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                            </option>
                        )
                        )
                        :
                        viewRoutineOtherUser.map((routine, i: number) => (
                            <option value={routine.id} className="font-bold">
                                {i !== viewRoutineOtherUser.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                            </option>
                        ))}
                </select>
            </div>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    <div className={`flex flex-col justify-around ${!setUsers ? 'h-2/5' : 'mt-5 h-3/5'}`}>
                        {routine.Days.map((day, i) => {
                            return (
                                <Detail
                                    day={day}
                                    i={i}
                                    routine={{ routineActual, routineId, weeks: routine.weeks }}
                                    setLoader={setLoader}
                                    setRoutineAdmin={setRoutineAdmin}
                                />
                            )
                        })}
                    </div>
                    <div className={`flex flex-col items-center ${setUsers && 'mt-5'}`}>
                        <div className="flex w-full justify-around">
                            {setUsers &&
                                <button
                                    className="buttonCancel w-52 ll:w-40 h-7"
                                    onClick={() => {
                                        if (setModal)
                                            setModal(undefined)
                                        updateIdGlobal(undefined)
                                    }
                                    }>
                                    Volver
                                </button>
                            }
                            <button
                                className="buttonCancel w-52 ll:w-40"
                                onClick={() => deletRoutine({
                                    id: routineId,
                                    userId: id,
                                    updateRoutinesUser: updateRoutinesUser,
                                    updateIdGlobal,
                                    setLoader,
                                    setUsers
                                })}>
                                🗑️ Rutina
                            </button>
                        </div>
                        <div className={`flex ${!setUsers && 'flex-col h-24'} mt-2 w-full justify-around`}>
                            <button
                                className="buttonConfirm w-52 ll:w-40 h-7"
                                onClick={() => setAddDay(prev => !prev)}
                            >
                                <QueueIcon className="mr-2" fontSize="small" /> Día

                            </button>
                            <button
                                className="buttonConfirm w-52 ll:w-40 h-7"
                                onClick={() => setOpenCreateRouitine(prev => !prev)}
                            >
                                <QueueIcon className="mr-2" fontSize="small" /> Rutina

                            </button>
                        </div>
                    </div>
                </>
                :
                <>
                    <b className="text-xl mt-3 dark:text-white text-gray-900">No tienes rutina</b>
                    <button
                        className="buttonConfirm w-52 ll:w-40 mt-2"
                        onClick={() => setOpenCreateRouitine(!opneCreateRoutine)}
                    >
                        Crear rutina
                    </button>
                </>
            }
            <Modal open={addDay || opneCreateRoutine || Boolean(loader) || Boolean(pag)} className='flex flex-col w-full h-full items-center justify-center'>
                <>
                    {addDay ?
                        <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={routine} />
                        :
                        pag != 0 ?
                            pag < Number(totalExercise) + 1 ?
                                <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} setAddDay={setAddDay} pag={pag} />
                                :
                                <TableConfirmDay
                                    key={routineId}
                                    dayCreate={dayCreate}
                                    setAddDay={setAddDay}
                                    setDayCreate={setDayCreate}
                                    setPag={setPag}
                                    setTotalExercise={setTotalExercise}
                                    routine={routine}
                                    routineActual={routineActual}
                                    routineId={routineId}
                                    setLoader={setLoader}
                                />
                            :
                            <></>
                    }
                    {opneCreateRoutine ?
                        <CreateRoutine
                            setOpenCreateRouitine={setOpenCreateRouitine}
                            userId={id}
                            updateRoutinesUser={updateRoutinesUser}
                            updateIdGlobal={updateIdGlobal}
                            setLoader={setLoader}
                        />
                        :
                        <></>
                    }
                </>
            </Modal>
        </div>
    )
}