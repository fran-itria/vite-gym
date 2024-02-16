import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../themeIcons/modifiedExerciseColors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableCellComponentProps } from '../../../types';
import useTabelRow from '../../../hook/Components/useTableRow';

export default function TableCell({ Loads, name, series, reps, id, weeks, setOpenLoad, setIdExercise }: TableCellComponentProps) {
    const { setOpen, setConfirmDelete } = useTabelRow()
    return (
        <>
            <td>
                <ThemeProvider theme={theme}>
                    <CreateIcon onClick={() => setOpen(open => !open)} sx={{ color: theme.palette.pencil.main }} />
                    <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => {
                        setIdExercise(id)
                        setConfirmDelete(confirmDelete => !confirmDelete)
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
            {
                weeks && weeks > Loads?.length ?
                    <td>
                        <AddCircleIcon color="success" onClick={() => {
                            setOpenLoad(openLoad => !openLoad)
                            setIdExercise(id)
                        }} />
                    </td>
                    :
                    <></>
            }
        </>
    )
}