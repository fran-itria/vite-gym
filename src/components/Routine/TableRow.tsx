/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themeIcons/modifiedExerciseColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableRowComponentProps } from "../../types";
import ModalAddLoad from "./ModalAddLoad";
import deleteExercise from "../../services/routine/exercises/deleteExercise";
import { useRoutineActions } from "../../hook/useRoutineActions";
import useTabelRow from "../../hook/Components/useTableRow";
import useInformation from "../../hook/Components/Routine/useInformation";

export default function TableRow({ weeks, id, name, series, reps, Loads }: TableRowComponentProps) {
    const { confirmDelete, idExercise, open, openLoad, setConfirmDelete, setIdExercise, setOpen, setOpenLoad } = useTabelRow()
    const { routineId } = useInformation()
    const { routineActual } = useRoutineActions()

    return (
        <tr>
            <td>
                <ThemeProvider theme={theme}>
                    <CreateIcon onClick={() => setOpen(!open)} sx={{ color: theme.palette.pencil.main }} />
                    <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => {
                        setIdExercise(id)
                        setConfirmDelete(!confirmDelete)
                    }} />
                </ThemeProvider>
            </td>
            <td>{name}</td>
            <td>{series}</td>
            <td>{reps}</td>
            {
                Loads?.map(load => {
                    return (
                        <td>
                            {load.loads}
                        </td>
                    )
                })
            }
            {weeks && weeks > Loads?.length ?
                <td>
                    <AddCircleIcon color="success" onClick={() => {
                        setOpenLoad(!openLoad)
                        setIdExercise(id)
                    }} />
                </td>
                :
                <></>
            }
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