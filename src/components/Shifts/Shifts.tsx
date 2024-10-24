/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "../../hook/store"
import DeleteIcon from "@mui/icons-material/Delete";
import Calendar from "./Calendar/Calendar"
import style from './Shifts.module.css'
import Loader from "../Loader";
import { useUserActions } from "../../hook/useUserActions";
import deleteShift from "../../services/calendar/deleteShift";
import ShiftsAdmin from "../Admin/Shifts/ShiftsAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@mui/material";

export default function Shifts() {
    const { Shifts, id, admin, GymId } = useAppSelector(state => state.user)
    const { updateShiftsUser } = useUserActions()
    const [loader, setLoader] = useState<string>()
    const [shifts, setShifts] = useState<{ limit: number, time: number, range: string[] }>()

    useEffect(() => {
        axios.get(`/gym/getGymId/${GymId}`)
            .then(response => {
                const { limit, time, range } = response.data
                setShifts({ limit, time, range })
            })
            .catch(error => window.alert(error.data.Error))
    }, [])

    return (
        <>
            {loader && <Loader text={loader} />}
            {!admin ?
                <>
                    {shifts && shifts.limit != 0 ?
                        <div>
                            <h3>El limite de cupos por turno es de {shifts.limit} con duracion de {shifts.time} hora</h3>
                        </div>
                        :
                        <></>
                    }
                    <div className={style.container}>
                        <Calendar setLoader={setLoader} range={shifts?.range} limit={shifts ? shifts.limit : null} />
                        <div>
                            <p>Mis turnos: </p>
                            {Shifts.length > 0 ?
                                <table className={style.table}>
                                    <thead style={{ width: '100px', display: 'flex', justifyContent: 'space-between' }}>
                                        <th>Día</th>
                                        <th>Hora</th>
                                    </thead>
                                    {Shifts.map(shift => {
                                        return (
                                            <div className={style.row}>
                                                <tr>
                                                    <td>{`${shift.day.split('-')[2]} - ${shift.day.split('-')[1]}`}</td>
                                                    <td>{`${shift.hour.split('-')[0]}`}</td>
                                                </tr>
                                                <DeleteIcon onClick={() => deleteShift({ shiftId: shift.id, userId: id, updateShiftsUser, setLoader })} />
                                            </div>
                                        )
                                    })}
                                </table>
                                :
                                <p>No tienes turnos asignados</p>
                            }
                        </div>
                    </div>
                </>
                :
                <ShiftsAdmin setLoader={setLoader} />
            }
        </>
    )
}