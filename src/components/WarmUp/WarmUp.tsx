import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { deleteWarmup } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
// import useWarmUpRoutine from "../../hook/Components/WarmUp/useWarmUpRoutine";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import Chronometer from "../Chronometer";
import Detail from "../Routine/Detail";
import { basicLoaders, specificLoaders } from "../../const";
import useInformation from "../../hook/Components/Routine/useInformation";
import { CaseResolve } from "../../types";
import { Modal } from "@mui/material";

export default function WarmUp() {
    const { WarmUps, id, loader, routine, routineActual, setLoader, routineId, updateIdGlobal } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()

    return (
        <>
            <div>
                <p>Seleccionar Calentamiento:</p>
                <select onChange={(e) => {
                    updateIdGlobal(e.target.value)
                    setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                }}>
                    <option value={routineId.id}></option>
                    {WarmUps.map((routine, i: number) => (
                        <option value={routine.id}>
                            {i !== WarmUps.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                        </option>
                    )
                    )}
                </select>
            </div>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    {routine.Days.map((day, i) => {
                        return (
                            <>
                                <Detail
                                    day={day}
                                    i={i}
                                    routineOrWarmUp={{ routineId: routineId.id, routineActual }}
                                    setLoader={setLoader}
                                    caseResolve={CaseResolve.calentamiento}
                                />
                            </>
                        )
                    })}
                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                    <button onClick={() => deleteWarmup({
                        id: routineId.id,
                        userId: id,
                        updateWarmUpUser,
                        updateIdGlobal,
                        setLoader
                    })}>
                        Borrar calentamiento
                    </button>
                    <button onClick={() => setCreateWarm(prev => !prev)}> + Calentamiento </button>
                    <Chronometer />
                </>
                :
                <>
                    <p>No tienes calentamiento actualmente</p>
                    <button onClick={() => setCreateWarm(!createWarm)}>Crear calentamiento</button>
                </>
            }
            <Modal open={addDay || createWarm || Boolean(loader) || Boolean(pag)}>
                <>
                    {
                        addDay ?
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
                    {loader ? <Loader text={loader} /> : <></>}
                </>
            </Modal>
        </>
    )
}