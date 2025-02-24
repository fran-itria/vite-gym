import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import Chronometer from "../Chronometer";
import { basicLoaders, specificLoaders } from "../../const";
import { CaseResolve, UsersComponent } from "../../types";
import { Modal } from "@mui/material";
import QueueIcon from '@mui/icons-material/Queue';
import useWarmUp from "./customHook";
import { deleteWarmup } from "./services";
import DetailWarmUp from "./Detail/DetailWarmUp";

interface Props {
    otherUserId?: string
    setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
    setModal?: React.Dispatch<React.SetStateAction<CaseResolve | undefined>>
    setWarmUpAdmin: boolean
}

export default function WarmUp({ otherUserId, setUsers, setModal, setWarmUpAdmin }: Props) {
    const [chagenOtherRoutine, setChangeOtherRoutine] = useState<boolean>(false)
    const { WarmUps, id, loader, setLoader, viewRoutineOtherUser, warmUp, warmUpActual, updateWarmUpIdGlobal, warmUpId } = useWarmUp({ chagenOtherRoutine, otherUserId, setChangeOtherRoutine })
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()

    return (
        <div className={`ll:w-full rounded ${setUsers ? 'background w-1/4 h-1/2' : 'flex flex-col items-center h-full justify-center'} p-4`}>
            {loader && <Loader text={loader} />}
            <div className="flex justify-center items-center">
                <b className="mr-2 dark:text-white text-gray-900">Seleccionar Calentamiento:</b>
                <select
                    className="rounded h-6 text-center bg-gray-700 dark:bg-gray-900"
                    onChange={(e) => {
                        if (viewRoutineOtherUser) {
                            setChangeOtherRoutine(true)
                        }
                        updateWarmUpIdGlobal(e.target.value)
                        setLoader(`${basicLoaders.loading} ${specificLoaders.warm} `)
                    }}
                    key={warmUpId}>
                    <option value={warmUpId}></option>
                    {!viewRoutineOtherUser ?
                        WarmUps.map((warmUp, i: number) => (
                            <option value={warmUp.id}>
                                {i !== WarmUps.length - 1 ? `Calentamiento ${i + 1} ` : 'Actual'}
                            </option>
                        )
                        )
                        :
                        viewRoutineOtherUser.map((warmUp, i: number) => (
                            <option value={warmUp.id}>
                                {i !== viewRoutineOtherUser.length - 1 ? `Calentamiento ${i + 1} ` : 'Actual'}
                            </option>
                        ))}
                </select>
            </div>
            {warmUp.Days?.length && warmUp.Days?.length > 0 ?
                <>
                    <div className={`flex flex-col justify-around ${!setUsers ? 'h-2/5' : 'mt-5 h-3/5'}`}>
                        {warmUp.Days.map((day, i) => {
                            return (
                                <DetailWarmUp
                                    key={day.id}
                                    day={day}
                                    i={i}
                                    warmUp={{ warmUpId, warmUpActual }}
                                    setLoader={setLoader}
                                    setWarmUpAdmin={setWarmUpAdmin}
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
                                        updateWarmUpIdGlobal(undefined)
                                        if (setModal)
                                            setModal(undefined)
                                    }
                                    }>
                                    Volver
                                </button>
                            }
                            <button
                                className="buttonCancel w-52 ll:w-40"
                                onClick={() => deleteWarmup({
                                    id: warmUpId,
                                    userId: id,
                                    updateWarmUpUser,
                                    updateWarmUpIdGlobal,
                                    setLoader,
                                    setUsers
                                })}>
                                🗑️ Calentamiento
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
                                onClick={() => setCreateWarm(prev => !prev)}
                            >
                                <QueueIcon className="mr-2" fontSize="small" /> Calentamiento
                            </button>
                        </div>
                    </div>
                    {!otherUserId && <Chronometer />}
                </>
                :
                <>
                    <b className="text-xl mt-3 dark:text-white text-gray-900">No tienes calentamiento</b>
                    <button
                        className="buttonConfirm w-52 ll:w-40 mt-2"
                        onClick={() => setCreateWarm(!createWarm)}
                    >
                        Crear calentamiento
                    </button>
                </>
            }
            <Modal open={addDay || createWarm || Boolean(pag)} className="h-full flex justify-center items-center">
                <>
                    {
                        addDay ?
                            <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={warmUp} />
                            :
                            pag != 0 &&
                                pag < Number(totalExercise) + 1 ?
                                <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} setAddDay={setAddDay} pag={pag} />
                                :
                                <TableConfirmDay
                                    key={warmUpId}
                                    dayCreate={dayCreate}
                                    setAddDay={setAddDay}
                                    setDayCreate={setDayCreate}
                                    setPag={setPag}
                                    setTotalExercise={setTotalExercise}
                                    routine={warmUp}
                                    routineActual={warmUpActual}
                                    routineId={warmUpId}
                                    setLoader={setLoader}
                                />
                    }
                    {
                        createWarm &&
                        <CreateRoutine
                            setOpenCreateRouitine={setCreateWarm}
                            userId={id}
                            updateWarmUpUser={updateWarmUpUser}
                            updateIdGlobal={updateWarmUpIdGlobal}
                            createWarm={createWarm}
                            setLoader={setLoader}
                        />
                    }
                </>
            </Modal>
        </div>
    )
}