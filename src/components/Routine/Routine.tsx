import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useInformation from "../../hook/Components/Routine/useInformation";
import Detail from "./Detail";
import FormTotalExercise from "./FormTotalExercise";
import { deletRoutine } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import Loader from "../Loader";
import { basicLoaders, specificLoaders } from "../../const";
import { CaseResolve } from "../../types";
import { Modal } from "@mui/material";
import { useUserActions } from "../../hook/useUserActions";
import { Props } from "../WarmUp/WarmUp";

export default function Routine({ otherUserId, isWarmUpOrRoutine, setUsers, setModal }: Props) {
    const [chagenOtherRoutine, setChangeOtherRoutine] = useState<boolean>(false)
    const { id, routine, routineId, routineActual, Routines, updateIdGlobal, loader, setLoader, viewRoutineOtherUser } = useInformation(otherUserId, isWarmUpOrRoutine, chagenOtherRoutine, setChangeOtherRoutine)
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()

    return (
        <div className="w-1/6 rounded background p-4 ll:w-full">
            {loader && <Loader text={loader} />}
            <div className="flex justify-center items-center">
                <b className="mr-2">Seleccionar rutina:</b>
                <select
                    className="rounded h-6 text-center"
                    onChange={(e) => {
                        if (viewRoutineOtherUser) {
                            setChangeOtherRoutine(true)
                        }
                        updateIdGlobal(e.target.value)
                        setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                    }}>
                    <option value={routineId.id}></option>
                    {!viewRoutineOtherUser ?
                        Routines.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== Routines.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                            </option>
                        )
                        )
                        :
                        viewRoutineOtherUser.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== viewRoutineOtherUser.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                            </option>
                        ))}
                </select>
            </div>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    <div className={`grid grid-cols-${routine.Days.length > 4 ? "4" : routine.Days.length} gap-3 mt-3`}>
                        {routine.Days.map((day, i) => {
                            return (
                                <div
                                >
                                    <Detail
                                        day={day}
                                        i={i}
                                        routineOrWarmUp={{ weeks: routine.weeks, routineId: routineId.id, routineActual }}
                                        setLoader={setLoader}
                                        isWarmUpOrRoutine={isWarmUpOrRoutine}
                                        caseResolve={CaseResolve.rutina}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex w-full justify-between ll:justify-around">
                            <button
                                className="buttonConfirm w-32"
                                onClick={() => setAddDay(prev => !prev)}
                            >
                                Crear día
                            </button>
                            <button
                                className="buttonConfirm w-32"
                                onClick={() => setOpenCreateRouitine(prev => !prev)}
                            >
                                Crear rutina
                            </button>
                        </div>
                        <div className="flex w-full justify-between mt-3 ll:justify-around">
                            <button
                                className="buttonCancel w-32"
                                onClick={() => {
                                    if (setModal)
                                        setModal(undefined)
                                    updateIdGlobal(undefined)
                                }
                                }>
                                Volver
                            </button>
                            <button
                                className="buttonCancel w-32"
                                onClick={() => deletRoutine({
                                    id: routineId.id,
                                    userId: id,
                                    updateRoutinesUser: updateRoutinesUser,
                                    updateIdGlobal,
                                    setLoader,
                                    setUsers
                                })}>
                                Borrar rutina
                            </button>
                        </div>
                    </div>
                </>
                :
                <>
                    <p>No tienes rutina actualmente</p>
                    <button onClick={() => setOpenCreateRouitine(!opneCreateRoutine)}>Crear rutina</button>
                </>
            }
            <Modal open={addDay || opneCreateRoutine || Boolean(loader) || Boolean(pag)}>
                <>
                    {addDay ?
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