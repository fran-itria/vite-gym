import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useInformation from "../../hook/Components/Routine/useInformation";
import Detail from "./Detail";
import FormTotalExercise from "./FormTotalExercise";
import { deletRoutine } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import { basicLoaders, specificLoaders } from "../../const";
import { CaseResolve } from "../../types";
import { Modal } from "@mui/material";

export default function Routine() {
    const { id, routine, routineId, routineActual, Routines, updateIdGlobal, loader, setLoader } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()

    return (
        <>
            <div>
                <p>Seleccionar rutina:</p>
                <select onChange={(e) => {
                    updateIdGlobal(e.target.value)
                    setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                }}>
                    <option value={routineId.id}></option>
                    {Routines.map((routine, i: number) => (
                        <option value={routine.id}>
                            {i !== Routines.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                        </option>
                    )
                    )}
                </select>
            </div>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    {routine.Days.map((day, i) => {
                        return (
                            <Detail
                                day={day}
                                i={i}
                                routineOrWarmUp={{ weeks: routine.weeks, routineId: routineId.id, routineActual }}
                                setLoader={setLoader}
                                caseResolve={CaseResolve.rutina}
                            />
                        )
                    })}
                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                    <button onClick={() => deletRoutine({
                        id: routineId.id,
                        userId: id,
                        updateRoutinesUser,
                        updateIdGlobal,
                        setLoader
                    })}>
                        Borrar rutina
                    </button>
                    <button onClick={() => setOpenCreateRouitine(prev => !prev)}> + Rutina </button>
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
                                <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
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
                    {loader ? <Loader text={loader} /> : <></>}
                </>
            </Modal>
        </>
    )
}