import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { deleteWarmup } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import { loaders } from "../../const";
import useWarmUpRoutine from "../../hook/Components/WarmUp/useWarmUpRoutine";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import Chronometer from "../Chronometer";
import Detail from "../Routine/Detail";

export default function WarmUp() {
    const { WarmUps, id, pending, setPending, updateWarmUpIdGlobal, warmUpActual, warmUpId, warmUp, Gym } = useWarmUpRoutine()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()

    return (
        <>
            {pending ? <Loader text={loaders.routine} />
                :
                <>
                    <div>
                        <p>Seleccionar Calentamiento:</p>
                        <select onChange={(e) => {
                            setPending(prevPending => !prevPending)
                            updateWarmUpIdGlobal(e.target.value)
                        }}>
                            <option value={warmUpId.id}></option>
                            {WarmUps.map((routine, i: number) => (
                                <option value={routine.id}>
                                    {i !== WarmUps.length - 1 ? `Rutina ${i + 1}` : 'Actual'}
                                </option>
                            )
                            )}
                        </select>
                    </div>
                    {warmUp.Days?.length && warmUp.Days?.length > 0 ?
                        <>
                            {warmUp.Days.map((day, i) => {
                                return (
                                    <>
                                        <Detail day={day} i={i} routineOrWarmUp={{ warmUpId: warmUpId.id, warmUpActual }} />
                                    </>
                                )
                            })}
                            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                            <button onClick={() => deleteWarmup({ id: warmUpId.id, warmUpActual, userId: id, updateWarmUpUser })}>Borrar calentamiento</button>
                            <button onClick={() => setCreateWarm(prev => !prev)}> + Calentamiento </button>
                            <Chronometer />
                        </>
                        :
                        <>
                            <p>No tienes calentamiento actualmente</p>
                            <button onClick={() => setCreateWarm(!createWarm)}>Crear calentamiento</button>
                        </>
                    }
                </>
            }
            {
                addDay ?
                    <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={warmUp} />
                    :
                    pag != 0 ?
                        pag < Number(totalExercise) + 1 ?
                            <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                            :
                            <TableConfirmDay
                                key={warmUpId.id}
                                dayCreate={dayCreate}
                                setAddDay={setAddDay}
                                setDayCreate={setDayCreate}
                                setPag={setPag}
                                setTotalExercise={setTotalExercise}
                                warmUp={warmUp}
                                warmUpActual={warmUpActual}
                                warmUpId={warmUpId.id}
                            />
                        :
                        <></>
            }
            {
                createWarm ?
                    <CreateRoutine
                        userId={id}
                        setOpenCreateRouitine={setCreateWarm}
                        warmUpActual={warmUpActual}
                        updateWarmUpUser={updateWarmUpUser}
                        createWarm={createWarm}
                        gymName={Gym?.name}
                        updateWarmUpIdGlobal={updateWarmUpIdGlobal}
                    />
                    :
                    <></>
            }
        </>
    )
}