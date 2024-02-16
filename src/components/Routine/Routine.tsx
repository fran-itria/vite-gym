/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import FormOneDay from "./CraeteOneDay/FormOneDay";
import TableConfirmDay from "./CraeteOneDay/TableConfirmDay";
import useDayCreate from "../../hook/Components/Routine/useCreateDay";
import useInformation from "../../hook/Components/Routine/useInformation";
import useGetRoutine from "../../hook/Components/Routine/useGetRoutine";
import Detail from "./Detail";

export default function Routine() {
    const { name, routine, routineId, surname } = useInformation()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    useGetRoutine()

    return (
        <>
            <p>Rutina de {name} {surname}</p>
            {routine.Days?.length && routine.Days?.length > 0 ?
                routine.Days.map((day, i) => {
                    return (
                        <Detail day={day} i={i} />
                    )
                })
                :
                <p>No tienes rutina actualmente</p>
            }
            <button onClick={() => setAddDay(!addDay)}>+ Día</button>
            {addDay ?
                <div>
                    Día número {routine.Days?.length ? routine.Days?.length + 1 : 1}
                    <label>
                        Cantidad de ejercicios:
                        <input name="exercises" onChange={(e) => setTotalExercise(e.target.value)}></input>
                    </label>
                    <button onClick={() => {
                        setPag(prev => prev + 1)
                        setAddDay(!addDay)
                    }
                    }>Siguiente</button>
                </div>
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
        </>
    )
}