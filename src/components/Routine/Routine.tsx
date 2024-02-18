import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useInformation from "../../hook/Components/Routine/useInformation";
import Detail from "./Detail";
import FormTotalExercise from "./FormTotalExercise";
import deletRoutine from "../../services/routine/deleteRoutine";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import { useUserActions } from "../../hook/useUserActions";

export default function Routine() {
    const { id, routine, routineId, routineActual, Routines, updateIdGlobal } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()

    return (
        <>
            <select onChange={(e) => updateIdGlobal(e.target.value)}>
                {Routines.map((routine, i: number) => (
                    <option value={routine.id}>
                        Rutina {i + 1}
                    </option>
                )
                )}
            </select>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    {routine.Days.map((day, i) => {
                        return (
                            <Detail day={day} i={i} />
                        )
                    })}
                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                    <button onClick={() => deletRoutine({ id: routineId.id, routineActual, userId: id, updateRoutinesUser })}>Borrar rutina</button>
                </>
                :
                <>
                    <p>No tienes rutina actualmente</p>
                    <button onClick={() => setOpenCreateRouitine(!opneCreateRoutine)}>Crear rutina</button>
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
                <CreateRoutine routineActual={routineActual} setOpenCreateRouitine={setOpenCreateRouitine} />
                :
                <></>
            }
        </>
    )
}