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
import { loaders } from "../../const";

export default function Routine() {
    const { id, routine, routineId, routineActual, Routines, updateIdGlobal, pending, setPending } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()

    return (
        <>
            {pending ? <Loader text={loaders.routine} />
                :
                <>
                    <div>
                        <p>Seleccionar rutina:</p>
                        <select onChange={(e) => {
                            setPending(prevPending => !prevPending)
                            updateIdGlobal(e.target.value)
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
                                    <Detail day={day} i={i} routineId={routineId} routineActual={routineActual} />
                                )
                            })}
                            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                            <button onClick={() => deletRoutine({ id: routineId.id, routineActual, userId: id, updateRoutinesUser })}>Borrar rutina</button>
                            <button onClick={() => setOpenCreateRouitine(prev => !prev)}> + Rutina </button>
                        </>
                        :
                        <>
                            <p>No tienes rutina actualmente</p>
                            <button onClick={() => setOpenCreateRouitine(!opneCreateRoutine)}>Crear rutina</button>
                        </>
                    }
                </>
            }
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
                        />
                    :
                    <></>
            }
            {opneCreateRoutine ?
                <CreateRoutine routineActual={routineActual} setOpenCreateRouitine={setOpenCreateRouitine} userId={id} updateRoutinesUser={updateRoutinesUser} />
                :
                <></>
            }
        </>
    )
}