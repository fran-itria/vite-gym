import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from "@mui/material/styles";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TableCellComponentProps } from '../../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import theme, { StyledTableCell } from "../../../themeIcons/customTheme";

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
    setWeekLoad,
    setRoutineAdmin
}: TableCellComponentProps) {
    const weeksArray = Array.from({ length: Number(weeks) }, (_, i) => Loads && Loads[i] ? Loads[i] : undefined)
    return (
        <>
            <StyledTableCell align="center" className='w-20'>
                <ThemeProvider theme={theme}>
                    <div className='w-full flex justify-center'>
                        <CreateIcon onClick={() => setOpen(open => !open)} sx={{ color: theme.palette.pencil.main }} />
                        <DeleteIcon sx={{ color: theme.palette.tashIcon.light }} onClick={() => {
                            setConfirmDelete(confirmDelete => !confirmDelete)
                        }}
                            className='ml-3' />
                    </div>
                </ThemeProvider>
            </StyledTableCell>
            <StyledTableCell align="center">
                {link &&
                    <a target='_blank' href={link}>
                        <VisibilityIcon />
                    </a>
                }
            </StyledTableCell>
            {name?.includes(',') ?
                <StyledTableCell align="center">
                    <div className='flex flex-col'>
                        {name.split(',').map(name => {
                            return <b className='mb-3 last:mb-0'>{name}</b>
                        })}
                    </div>
                </StyledTableCell>
                :
                <StyledTableCell align="center"><b>{name}</b></StyledTableCell>
            }
            {String(series).includes(',') ?
                <StyledTableCell align="center">
                    <div className='flex flex-col'>
                        {String(series).split(',').map(serie => {
                            return <b className='mb-3 last:mb-0'>{serie}</b>
                        })}
                    </div>
                </StyledTableCell>
                :
                <StyledTableCell align="center"><b>{series}</b></StyledTableCell>
            }
            {reps?.includes(',') ?
                <StyledTableCell align="center">
                    <div className='flex flex-col'>
                        {reps.split(',').map(rep => {
                            return <b className='mb-3 last:mb-0'>{rep}</b>
                        })}
                    </div>
                </StyledTableCell>
                :
                <StyledTableCell align="center"><b>{reps}</b></StyledTableCell>
            }
            {
                Loads && weeksArray && weeksArray?.map((value, index) => {
                    if (value)
                        return (
                            <StyledTableCell align="center">
                                <button
                                    className={`button w-full ${setRoutineAdmin && 'opacity-90 pointer-events-none'}`}
                                    onClick={() => {
                                        setLoad(value.loads && value.loads)
                                        setIdLoad(value.id ? value.id : '')
                                    }}>
                                    {value.loads?.includes(',') ?
                                        <div className='flex flex-col'>
                                            {value.loads.split(',').map(load => {
                                                return <b className='mb-3 last:mb-0'>{load}</b>
                                            })}
                                        </div>
                                        :
                                        <b>{value.loads}</b>
                                    }
                                </button>
                            </StyledTableCell>
                        )
                    else if (weeksArray.findIndex((e) => e == undefined) == index) {
                        return <StyledTableCell align='center'>
                            <AddCircleIcon
                                className={`${setRoutineAdmin && 'opacity-50 pointer-events-none'}`}
                                color="success"
                                onClick={() => {
                                    setOpenLoad(openLoad => !openLoad)
                                    setWeekLoad(Loads.length + 1)
                                }} />
                        </StyledTableCell>
                    } else return <StyledTableCell></StyledTableCell>
                })
            }
        </>
    )
}