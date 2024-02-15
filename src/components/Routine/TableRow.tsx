/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themeIcons/modifiedExerciseColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableRowComponentProps } from "../../types";
import ModalAddLoad from "./ModalAddLoad";

export default function TableRow({ exercise, weeksLoads }: TableRowComponentProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [openLoad, setOpenLoad] = useState<boolean>(false)
    const [idExercise, setIdExercise] = useState<string | null>('')


    return (
        <tr key={exercise.id}>
            <td>{exercise.name}</td>
            <td>{exercise.series}</td>
            <td>{exercise.reps}</td>
            {weeksLoads.map((_week, i: number) => {
                if (exercise.Loads[i]) {
                    return (
                        <td key={exercise.Loads[i].id}>
                            <p>{exercise.Loads[i].loads}</p>
                        </td>
                    )
                }
                return (
                    <>
                        <td>
                            <AddCircleIcon color="success" onClick={() => {
                                setOpenLoad(!openLoad)
                                setIdExercise(exercise.id)
                            }} />
                        </td>
                        {openLoad ? (
                            <ModalAddLoad idExercise={idExercise} setOpenLoad={setOpenLoad} />
                        )
                            :
                            <></>}
                    </>
                )
            })
            }
            <td>
                <ThemeProvider theme={theme}>
                    <CreateIcon onClick={() => setOpen(!open)} sx={{ color: theme.palette.pencil.main }} />
                    <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} />
                </ThemeProvider>
            </td>
        </tr>
    )
}