/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from './TableCell';
import ConfirmDelete from "./ConfirmDelete";

export default function TableRow({ weeks, id, name, series, reps, Loads }: TableRowComponentProps) {
    const { confirmDelete, setConfirmDelete, openLoad, setOpenLoad } = useTabelRow()

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
            />
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