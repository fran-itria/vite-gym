/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";
import ModifiedExercise from "./ModifiedExercise";
import { useState } from "react";
import { updateLoad } from "../../../services/routine/exercises/updateLoad";

export default function TableRow({
    id,
    name,
    series,
    reps,
    link,
    Loads,
    routineOrWarmUp
}: TableRowComponentProps) {
    const { open, setOpen, confirmDelete, setConfirmDelete, openLoad, setOpenLoad } = useTabelRow()
    const { routineActual, routineId, warmUpActual, warmUpId, weeks } = routineOrWarmUp
    const [load, setLoad] = useState<boolean>(false)
    const [idLoad, setIdLoad] = useState<string>('')
    const [newLoads, setNewLoads] = useState<string>('')

    return (
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
            />
            {open ?
                <ModifiedExercise
                    id={id}
                    name={name}
                    series={series}
                    reps={reps}
                    setOpen={setOpen}
                    routineOrWarmUp={{ routineActual, routineId, warmUpActual, warmUpId }}
                />
                :
                <></>
            }
            {openLoad ?
                <ModalAddLoad key={id} id={id} setOpenLoad={setOpenLoad} />
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
                    warmUpActual={warmUpActual}
                    warmUpId={warmUpId}
                />
                :
                <></>
            }
            {load ?
                <form>
                    <label>
                        Carga:
                        <input type='text' onChange={(e) => setNewLoads(e.target.value)}></input>
                    </label>
                    <button onClick={() => updateLoad(idLoad, newLoads, routineActual, routineId)}>Guardar</button>
                    <button onClick={() => setLoad(!load)}>Cancelar</button>
                </form>
                :
                <></>
            }
        </tr >
    )
}