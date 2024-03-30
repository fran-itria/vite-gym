import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../themeIcons/customTheme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableCellComponentProps } from '../../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function TableCell({
    Loads,
    name,
    series,
    reps,
    link,
    weeks,
    setOpenLoad,
    setConfirmDelete,
    setOpen,
    setLoad,
    setIdLoad,
    setWeekLoad
}: TableCellComponentProps) {

    return (
        <>
            <td>
                <ThemeProvider theme={theme}>
                    <CreateIcon onClick={() => setOpen(open => !open)} sx={{ color: theme.palette.pencil.main }} />
                    <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => {
                        setConfirmDelete(confirmDelete => !confirmDelete)
                    }} />
                </ThemeProvider>
            </td>
            <td>
                {link ?
                    <a target='_blank' href={link}>
                        <VisibilityIcon />
                    </a>
                    :
                    <></>
                }
            </td>
            <td>{name}</td>
            <td>{series}</td>
            <td>{reps}</td>
            {
                Loads ? Loads?.map(load => {
                    return (
                        <td>
                            <button onClick={() => {
                                setLoad(load => !load)
                                setIdLoad(load.id ? load.id : '')
                            }}>
                                {load.loads}
                            </button>
                        </td>
                    )
                })
                    :
                    <></>
            }
            {
                weeks && Loads && weeks > Loads?.length ?
                    <td>
                        <AddCircleIcon color="success" onClick={() => {
                            setOpenLoad(openLoad => !openLoad)
                            setWeekLoad(Loads.length + 1)
                        }} />
                    </td>
                    :
                    <></>
            }
        </>
    )
}

// USAR lOADS.LENGHT COMO WEEK CUANDO CREO LA CARGA