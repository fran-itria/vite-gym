/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import deleteExercise from "../../../services/routine/exercises/deleteExercise";
import { useRoutineActions } from "../../../hook/useRoutineActions";
import useTabelRow from "../../../hook/Components/useTableRow";
import useInformation from "../../../hook/Components/Routine/useInformation";
import TableCell from './TableCell';

export default function TableRow({ weeks, id, name, series, reps, Loads }: TableRowComponentProps) {
    const { confirmDelete, idExercise, openLoad, setConfirmDelete, setOpenLoad, setIdExercise } = useTabelRow()
    const { routineId } = useInformation()
    const { routineActual } = useRoutineActions()

    return (
        <tr>
            <TableCell
                weeks={weeks}
                id={id}
                Loads={Loads}
                series={series}
                reps={reps}
                name={name}
                setOpenLoad={setOpenLoad}
                setIdExercise={setIdExercise}
            />
            {openLoad ?
                <ModalAddLoad idExercise={idExercise} setOpenLoad={setOpenLoad} />
                :
                <></>
            }
            {confirmDelete ?
                <div style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '5px, solid, black', position: 'absolute', top: '50%', right: '50%' }}>
                    <p style={{ color: 'black' }}>{idExercise}</p>
                    <p> Desea eliminar el ejercicio {name} </p>
                    <button style={{ background: 'red', color: 'white' }} onClick={() => deleteExercise(idExercise, routineId, routineActual, setConfirmDelete)}>
                        Borrar
                    </button>
                    <button style={{ background: 'green', color: 'white' }} onClick={() => setConfirmDelete(!confirmDelete)}>
                        Cancelar
                    </button>
                </div>
                :
                <></>
            }
        </tr >
    )
}