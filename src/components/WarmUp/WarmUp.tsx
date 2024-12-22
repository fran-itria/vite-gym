import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { deleteWarmup } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import Chronometer from "../Chronometer";
import Detail from "../Routine/Detail";
import { basicLoaders, specificLoaders } from "../../const";
import useInformation from "../../hook/Components/Routine/useInformation";
import { CaseResolve, UsersComponent } from "../../types";
import { Modal } from "@mui/material";
import QueueIcon from '@mui/icons-material/Queue';

export type Props = {
    otherUserId?: string
    isWarmUpOrRoutine?: CaseResolve
    setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
    setModal?: (value: React.SetStateAction<CaseResolve | undefined>) => void
    children?: React.ReactNode
}

export default function WarmUp({ otherUserId, isWarmUpOrRoutine, setUsers, setModal }: Props) {
    const [chagenOtherRoutine, setChangeOtherRoutine] = useState<boolean>(false)
    const { WarmUps, id, loader, routine, routineActual, setLoader, routineId, updateIdGlobal, viewRoutineOtherUser } = useInformation(otherUserId, isWarmUpOrRoutine, chagenOtherRoutine, setChangeOtherRoutine)
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()

    return (
        <div className={`ll:w-full rounded ${setUsers ? 'background w-1/4 h-1/2' : 'flex flex-col items-center h-full justify-center'} p-4`}>
            {loader && <Loader text={loader} />}
            <div className="flex justify-center items-center">
                <b className="mr-2">Seleccionar Calentamiento:</b>
                <select
                    className="rounded h-6 text-center"
                    onChange={(e) => {
                        if (viewRoutineOtherUser) {
                            setChangeOtherRoutine(true)
                        }
                        updateIdGlobal(e.target.value)
                        setLoader(`${basicLoaders.loading} ${specificLoaders.warm} `)
                    }}>
                    <option value={routineId.id}></option>
                    {!viewRoutineOtherUser ?
                        WarmUps.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== WarmUps.length - 1 ? `Calentamiento ${i + 1} ` : 'Actual'}
                            </option>
                        )
                        )
                        :
                        viewRoutineOtherUser.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== viewRoutineOtherUser.length - 1 ? `Calentamiento ${i + 1} ` : 'Actual'}
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
                                    routineOrWarmUp={{ routineId: routineId.id, routineActual }}
                                    setLoader={setLoader}
                                    isWarmUpOrRoutine={isWarmUpOrRoutine}
                                    caseResolve={CaseResolve.calentamiento}
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
                                onClick={() => deleteWarmup({
                                    id: routineId.id,
                                    userId: id,
                                    updateWarmUpUser,
                                    updateIdGlobal,
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
                    <p>No tienes calentamiento actualmente</p>
                    <button onClick={() => setCreateWarm(!createWarm)}>Crear calentamiento</button>
                </>
            }
            <Modal open={addDay || createWarm || Boolean(pag)}>
                <>
                    {
                        addDay ?
                            <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={routine} />
                            :
                            pag != 0 ?
                                pag < Number(totalExercise) + 1 ?
                                    <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} setAddDay={setAddDay} pag={pag} />
                                    :
                                    <TableConfirmDay
                                        key={routineId.id}
                                        dayCreate={dayCreate}
                                        setAddDay={setAddDay}
                                        setDayCreate={setDayCreate}
                                        setPag={setPag}
                                        setTotalExercise={setTotalExercise}
                                        routine={routine}
                                        routineActual={routineActual}
                                        routineId={routineId.id}
                                        setLoader={setLoader}
                                    />
                                :
                                <></>
                    }
                    {
                        createWarm ?
                            <CreateRoutine
                                setOpenCreateRouitine={setCreateWarm}
                                userId={id}
                                updateWarmUpUser={updateWarmUpUser}
                                updateIdGlobal={updateIdGlobal}
                                createWarm={createWarm}
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