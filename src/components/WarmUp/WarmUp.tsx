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
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themeIcons/customTheme";

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
        <div className="w-1/4 rounded background p-4 ll:w-full">
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
                        setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                    }}>
                    <option value={routineId.id}></option>
                    {!viewRoutineOtherUser ?
                        WarmUps.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== WarmUps.length - 1 ? `Calentamiento ${i + 1}` : 'Actual'}
                            </option>
                        )
                        )
                        :
                        viewRoutineOtherUser.map((routine, i: number) => (
                            <option value={routine.id}>
                                {i !== viewRoutineOtherUser.length - 1 ? `Calentamiento ${i + 1}` : 'Actual'}
                            </option>
                        ))}
                </select>
            </div>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    <div className={`grid grid-cols-${routine.Days.length > 4 ? "4" : routine.Days.length} gap-3 mt-3`}>
                        {routine.Days.map((day, i) => {
                            return (
                                <div>
                                    <Detail
                                        day={day}
                                        i={i}
                                        routineOrWarmUp={{ routineId: routineId.id, routineActual }}
                                        setLoader={setLoader}
                                        isWarmUpOrRoutine={isWarmUpOrRoutine}
                                        caseResolve={CaseResolve.calentamiento}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex w-full justify-around ll:justify-around">
                            <button
                                className="buttonConfirm w-52 ll:w-40"
                                onClick={() => setAddDay(prev => !prev)}
                            >
                                Crear día
                            </button>
                            <button
                                className="buttonConfirm w-52 ll:w-40"
                                onClick={() => setCreateWarm(prev => !prev)}
                            >
                                Crear calentamiento
                            </button>
                        </div>
                        <div className="flex w-full justify-around mt-3 ll:justify-around">
                            <button
                                className="buttonCancel w-52 ll:w-40"
                                onClick={() => {
                                    if (setModal)
                                        setModal(undefined)
                                    updateIdGlobal(undefined)
                                }
                                }>
                                Volver
                            </button>
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
                                <ThemeProvider theme={theme}>
                                    <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} />
                                    calentamiento
                                </ThemeProvider>
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