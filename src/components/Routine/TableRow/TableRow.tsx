/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";
import { useEffect } from "react";
import ModifiedExercise from "./ModifiedExercise";

export default function TableRow({ weeks, id, name, series, reps, Loads }: TableRowComponentProps) {
    const { open, setOpen, confirmDelete, setConfirmDelete, openLoad, setOpenLoad } = useTabelRow()

    useEffect(() => console.log(open), [open])
    return (
        <tr>
            <TableCell
                key={id}
                weeks={weeks}
                id={id}
                Loads={Loads}
                series={series}
                reps={reps}
                name={name}
                setOpenLoad={setOpenLoad}
                setConfirmDelete={setConfirmDelete}
                setOpen={setOpen}
            />
            {open ?
                <ModifiedExercise id={id} name={name} series={series} reps={reps} setOpen={setOpen} />
                :
                <></>
            }
            {openLoad ?
                <ModalAddLoad key={id} id={id} setOpenLoad={setOpenLoad} />
                :
                <></>
            }
            {confirmDelete ?
                <ConfirmDelete key={id} name={name} id={id} setConfirmDelete={setConfirmDelete} />
                :
                <></>
            }
        </tr >
    )
}