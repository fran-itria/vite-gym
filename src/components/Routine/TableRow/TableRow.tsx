/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";
import ModifiedExercise from "./ModifiedExercise";

export default function TableRow({
    id,
    name,
    series,
    reps,
    Loads,
    routineOrWarmUp
}: TableRowComponentProps) {
    const { open, setOpen, confirmDelete, setConfirmDelete, openLoad, setOpenLoad } = useTabelRow()
    const {routineActual, routineId, warmUpActual, warmUpId, weeks} = routineOrWarmUp
    
    return (
        <tr>
            <TableCell
                key={id}
                weeks={weeks ? weeks : undefined}
                id={id}
                Loads={Loads ? Loads : undefined}
                series={series}
                reps={reps}
                name={name}
                setOpenLoad={setOpenLoad}
                setConfirmDelete={setConfirmDelete}
                setOpen={setOpen}
            />
            {open ?
                <ModifiedExercise 
                    id={id} 
                    name={name} 
                    series={series} 
                    reps={reps} 
                    setOpen={setOpen} 
                    routineOrWarmUp={{routineActual, routineId, warmUpActual, warmUpId}}
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
        </tr >
    )
}