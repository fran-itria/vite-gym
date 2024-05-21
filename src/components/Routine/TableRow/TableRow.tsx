/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";
import ModifiedExercise from "./ModifiedExercise";
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise";
import { useState } from "react";

export default function TableRow({ id, name, series, reps, link, Loads, routineOrWarmUp, setLoader, setRoutineAdmin, setWarmUpAdmin, caseResolve }: TableRowComponentProps) {
    const { open, setOpen, confirmDelete, setConfirmDelete, openLoad, setOpenLoad, idLoad, setIdLoad, load, setLoad, newLoads, setNewLoads } = useTabelRow()
    const { routineActual, routineId, weeks } = routineOrWarmUp
    const [weekLoad, setWeekLoad] = useState<number>(0)

    return (
        <>
            <tr>
                <TableCell
                    key={id}
                    weeks={weeks ? weeks : undefined}
                    id={id}
                    Loads={Loads ? Loads : undefined}
                    series={series}
                    reps={reps}
                    link={link}
                    name={name}
                    setOpenLoad={setOpenLoad}
                    setConfirmDelete={setConfirmDelete}
                    setOpen={setOpen}
                    setLoad={setLoad}
                    setIdLoad={setIdLoad}
                    setWeekLoad={setWeekLoad}
                    setRoutineAdmin={setRoutineAdmin}
                />
                {open ?
                    <ModifiedExercise
                        id={id}
                        name={name}
                        series={series}
                        reps={reps}
                        setOpen={setOpen}
                        routineOrWarmUp={{ routineActual, routineId }}
                        setLoader={setLoader}
                        setRoutineAdmin={setRoutineAdmin}
                        setWarmUpAdmin={setWarmUpAdmin}
                        caseResolve={caseResolve}
                    />
                    :
                    <></>
                }
                {openLoad ?
                    <ModalAddLoad key={id} id={id} setOpenLoad={setOpenLoad} setLoader={setLoader} weekLoad={weekLoad} />
                    :
                    <></>
                }
                {confirmDelete ?
                    <ConfirmDelete
                        key={id}
                        name={name}
                        id={id}
                        setConfirmDelete={setConfirmDelete}
                        routineActual={routineActual}
                        routineId={routineId}
                        setLoader={setLoader}
                        setRoutineAdmin={setRoutineAdmin}
                        setWarmUpAdmin={setWarmUpAdmin}
                        caseResolve={caseResolve}
                    />
                    :
                    <></>
                }
                {load ?
                    <div>
                        <label>
                            Carga:
                            <input type='text' onChange={(e) => setNewLoads(e.target.value)}></input>
                        </label>
                        <button onClick={() => modifiedLoads({ id: idLoad, load: newLoads, routineActual, routineId, setLoad, setLoader })}>Guardar</button>
                        <button onClick={() => setLoad(!load)}>Cancelar</button>
                    </div>
                    :
                    <></>
                }
            </tr >
        </>
    )
}