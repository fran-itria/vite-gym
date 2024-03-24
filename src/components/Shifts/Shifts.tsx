import { useAppSelector } from "../../hook/store"
import DeleteIcon from "@mui/icons-material/Delete";
import Calendar from "./Calendar/Calendar"
import style from './Shifts.module.css'
import useLoaders from "../../hook/Components/useLoaders";
import Loader from "../Loader";
import { useUserActions } from "../../hook/useUserActions";
import deleteShift from "../../services/calendar/deleteShift";
import ShiftsAdmin from "../Admin/Shifts/ShiftsAdmin";

export default function Shifts() {
    const { Shifts, id, admin } = useAppSelector(state => state.user)
    const { updateShiftsUser } = useUserActions()
    const { loader, setLoader } = useLoaders()

    return (
        <>
            {!admin ?
                <>
                    <div className={style.container}>
                        <Calendar setLoader={setLoader} />
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
                                                    <td>{`${shift.hour.split(':')[0]}:${shift.hour.split(':')[1]}`}</td>
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
                    {loader && loader.reason ? <Loader text={loader.reason} /> : <></>}
                </>
                :
                <ShiftsAdmin />
            }
        </>
    )
}