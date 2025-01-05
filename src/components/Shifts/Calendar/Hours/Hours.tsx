import { component } from "./type"

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
        <div className="ll:w-full flex justify-center">
            {range && range.length > 0 ?
                <div className="w-96 ll:w-full grid grid-cols-3 gap-4">
                    {range.map((hour, index) => {
                        if (hoursRange && hoursRange?.length > 0 && limit) {
                            const firstHour = hour.split('-')[0].split(':')[0]
                            const hoursRangeFilter = hoursRange.filter(h => h.hour.split('-')[0].split(':')[0] == firstHour).length
                            if (hoursRangeFilter < limit) {
                                return (
                                    <button
                                        key={index} onClick={() => {
                                            setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour })
                                        }}
                                        className={hour == selectDay?.hour ? 'buttonConfirm' : 'button'}
                                    >{hour}</button>
                                )
                            }
                        }
                        else return (
                            <button key={index} onClick={() => {
                                setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour })
                            }}
                                className={hour == selectDay?.hour ? 'buttonConfirm' : 'button'}
                            >{hour}</button>
                        )
                    }
                    )}
                </div>
                :
                <div className="flex justify-around items-center w-60 ll:w-64">
                    <label className="font-bold">
                        Seleccionar hora:
                    </label>
                    <input
                        type="time"
                        value={defaultTime}
                        onChange={(e) => {
                            setDefaultTime(e.target.value)
                            setSelectDay({ day: `${actualYear}-${month + 1}-${day}`, hour: e.target.value })
                        }
                        }
                        className="ll:w-28"
                    ></input>
                </div>
            }
        </div>
    )
}