import { component } from "./type"
import style from '../Calendar.module.css'

export default function Hours({
    range,
    hoursRange,
    limit,
    setSelectDay,
    setDefaultTime,
    defaultTime,
    actualYear,
    month,
    day,
    selectDay
}: component) {
    return (
        <div>
            {range && range.length > 0 ?
                range.map((hour, index) => {
                    if (hoursRange && hoursRange?.length > 0 && limit) {
                        const firstHour = hour.split('-')[0].split(':')[0]
                        const hoursRangeFilter = hoursRange.filter(h => h.hour.split('-')[0].split(':')[0] == firstHour).length
                        if (hoursRangeFilter < limit) {
                            return (
                                <button key={index} onClick={() => {
                                    setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour })
                                }}
                                    className={hour == selectDay?.hour ? style.hourSelected : style.hour}
                                >{hour}</button>
                            )
                        }
                    }
                    else return (
                        <button key={index} onClick={() => {
                            setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour })
                        }}
                            className={hour == selectDay?.hour ? style.hourSelected : style.hour}
                        >{hour}</button>
                    )
                }
                )
                :
                <label>
                    Seleccionar hora:
                    <input type="time" value={defaultTime} onChange={(e) => {
                        setDefaultTime(e.target.value)
                        setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour: e.target.value })
                    }
                    }></input>
                </label>
            }
        </div>
    )
}