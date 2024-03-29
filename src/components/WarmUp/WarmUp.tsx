import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import { deleteWarmup } from "../../services/routine/deleteRoutine";
import { useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import Loader from "../Loader";
import useWarmUpRoutine from "../../hook/Components/WarmUp/useWarmUpRoutine";
import FormTotalExercise from "../Routine/FormTotalExercise";
import FormOneDay from "../Routine/CraeteOneDay/FormOneDay";
import TableConfirmDay from "../Routine/CraeteOneDay/TableConfirmDay";
import CreateRoutine from "../Routine/CreateRoutine";
import Chronometer from "../Chronometer";
import Detail from "../Routine/Detail";
import { basicLoaders, specificLoaders } from "../../const";

export default function WarmUp() {
    const { WarmUps, id, updateWarmUpIdGlobal, warmUpActual, warmUpId, warmUp, loader, setLoader } = useWarmUpRoutine()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateWarmUpUser } = useUserActions()

    return (
        <>
            <div>
                <p>Seleccionar Calentamiento:</p>
                <select onChange={(e) => {
                    updateWarmUpIdGlobal(e.target.value)
                    setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.warm}` })
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
                                <Detail
                                    day={day}
                                    i={i}
                                    routineOrWarmUp={{ warmUpId: warmUpId.id, warmUpActual }}
                                    setLoader={setLoader}
                                />
                            </>
                        )
                    })}
                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                    <button onClick={() => deleteWarmup({
                        id: warmUpId.id,
                        userId: id,
                        updateWarmUpUser,
                        updateWarmUpIdGlobal,
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
                        updateWarmUpIdGlobal={updateWarmUpIdGlobal}
                        createWarm={createWarm}
                        setLoader={setLoader}
                    />
                    :
                    <></>
            }
            {loader.state && loader.reason ? <Loader text={loader.reason} /> : <></>}
        </>
    )
}