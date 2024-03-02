import { useAppSelector } from "../../hook/store"
import DeleteIcon from "@mui/icons-material/Delete";
import Calendar from "./Calendar/Calendar"
import style from './Shifts.module.css'
import useLoaders from "../../hook/Components/useLoaders";
import Loader from "../Loader";
import { loaders } from "../../const";
import { useUserActions } from "../../hook/useUserActions";
import deleteShift from "../../services/calendar/deleteShift";

export default function Shifts() {
    const { Shifts, id } = useAppSelector(state => state.user)
    const { updateShiftsUser } = useUserActions()
    const { create, setCreate, remove, setRemove } = useLoaders()

    return ( 
        <>
            <div className={style.container}>
                <Calendar setCreate={setCreate}/>
                <div>
                    <p>Mis turnos: </p>
                    {Shifts.length > 0 ? 
                        <table className={style.table}>
                            <thead style={{width: '100px', display: 'flex', justifyContent: 'space-between'}}>
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
                                        <DeleteIcon onClick={() => deleteShift({shiftId: shift.id, userId: id, updateShiftsUser, setRemove})}/>
                                    </div>
                                )
                            })}
                        </table>
                        :
                        <p>No tienes turnos asignados</p>    
                    }
                </div>
            </div>
            {create ? <Loader text={loaders.createShift}/> : remove ? <Loader text={loaders.deleteShift}/> : <></>}
        </>
    )
}