import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useInformation from "../../hook/Components/Routine/useInformation";
import Detail from "./Detail";
import FormTotalExercise from "./FormTotalExercise";
import deletRoutine from "../../services/routine/deleteRoutine";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";

export default function Routine() {
    const { name, routine, surname, routineId, routineActual } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const [opneCreateRoutine, setOpenCreateRouitine] = useState<boolean>(false)

    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days?.length && routine.Days?.length > 0 ?
                <>
                    {routine.Days.map((day, i) => {
                        return (
                            <Detail day={day} i={i} />
                        )
                    })}
                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                    <button onClick={() => deletRoutine(routineId, routineActual)}>Borrar rutina</button>
                </>
                :
                <>
                    <p>No tienes rutina actualmente</p>
                    <button onClick={() => setOpenCreateRouitine(!opneCreateRoutine)}>Crear rutina</button>
                </>
            }
            {addDay ?
                <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} />
                :
                pag != 0 ?
                    pag < Number(totalExercise) + 1 ?
                        <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                        :
                        <TableConfirmDay
                            key={routineId}
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
                <CreateRoutine routineActual={routineActual} />
                :
                <></>
            }
        </>
    )
}