/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "../../hook/store"
import DeleteIcon from "@mui/icons-material/Delete";
import Calendar from "./Calendar/Calendar"
import Loader from "../Loader";
import { useUserActions } from "../../hook/useUserActions";
import deleteShift from "../../services/calendar/deleteShift";
import ShiftsAdmin from "../Admin/Shifts/ShiftsAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import theme, { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme";
import { ThemeProvider } from "styled-components";
import { shift } from "../../store/user/slice";

export default function Shifts() {
    const { Shifts, id, admin, GymId, Gym } = useAppSelector(state => state.user)
    const { updateShiftsUser } = useUserActions()
    const [loader, setLoader] = useState<string>()
    const [shifts, setShifts] = useState<{ limit: number, time: number, range: string[] }>()
    const [arrayShifts, setArrayShifts] = useState<shift[] | []>([])


    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                const { limit, time, range } = response.data
                setShifts({ limit, time, range })
            })
            .catch(error => window.alert(error.data.Error))
    }, [])

    useEffect(() => {
        const array = Shifts.filter(shift => shift.Gym.name == Gym?.name)
        setArrayShifts(array)
    }, [Shifts])

    useEffect(() => console.log(shifts), [shifts])

    return (
        <>
            {loader && <Loader text={loader} />}
            {!admin ?
                <div className="mt-3">
                    {shifts && shifts.limit != null &&
                        <b className="dark:text-white text-black text-lg">El limite de cupos por turno es de {shifts.limit} con duracion de {shifts.time} hora</b>
                    }
                    <div className="flex justify-center ll:flex-col ll:justify-center ll:items-center mt-5">
                        <Calendar setLoader={setLoader} range={shifts?.range} limit={shifts ? shifts.limit : null} />
                        <div className="ll:mb-5">
                            {arrayShifts.length > 0 &&
                                <>
                                    <b className="text-black dark:text-white">Mis turnos: </b>
                                    <TableContainer className='rounded overflow-auto w-96 max-h-120 max-w-6xl ll:max-w-smd ll:max-h-72'>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Día</StyledTableCell>
                                                    <StyledTableCell align="center">Hora</StyledTableCell>
                                                    <StyledTableCell align="center"></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {arrayShifts.map(shift => {
                                                    const day = shift.day.split('-')
                                                    return (
                                                        <StyledTableRow>
                                                            <StyledTableCell align="center">{`${day[2]} - ${day[1]}`}</StyledTableCell>
                                                            <StyledTableCell align="center">{shift.hour.split('-')[0]}</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <ThemeProvider theme={theme}>
                                                                    <DeleteIcon
                                                                        sx={{ color: theme.palette.tashIcon.light }}
                                                                        onClick={() => deleteShift({ shiftId: shift.id, userId: id, updateShiftsUser, setLoader })}
                                                                    />
                                                                </ThemeProvider>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            }
                        </div>
                    </div>
                </div>
                :
                <ShiftsAdmin setLoader={setLoader} />
            }
        </>
    )
}