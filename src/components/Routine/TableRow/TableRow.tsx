/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";
import ModifiedExercise from "./ModifiedExercise";
import { updateLoad } from "../../../services/routine/exercises/updateLoad";
import useLoaders from "../../../hook/Components/useLoaders";
import Loader from "../../Loader";
import { loaders } from "../../../const";

export default function TableRow({
    id,
    name,
    series,
    reps,
    link,
    Loads,
    routineOrWarmUp
}: TableRowComponentProps) {
    const {
        open,
        setOpen,
        confirmDelete,
        setConfirmDelete,
        openLoad,
        setOpenLoad,
        idLoad,
        setIdLoad,
        load,
        setLoad,
        newLoads,
        setNewLoads
    } = useTabelRow()
    const { routineActual, routineId, warmUpActual, warmUpId, weeks } = routineOrWarmUp
    const { loading, setLoading } = useLoaders()

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
                    <div>
                        <label>
                            Carga:
                            <input type='text' onChange={(e) => setNewLoads(e.target.value)}></input>
                        </label>
                        <button onClick={() => updateLoad({ id: idLoad, newLoads, routineActual, routineId, setLoad, setLoading })}>Guardar</button>
                        <button onClick={() => setLoad(!load)}>Cancelar</button>
                    </div>
                    :
                    <></>
                }
            </tr >
            {loading ? <Loader text={loaders.update} /> : <></>}
        </>
    )
}