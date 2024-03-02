import { useState } from "react"
import moment from "moment";

export default function useCalendar(){
    const [month, setMonth] = useState<number>(moment().month())
    const [day, setDay] = useState<number>(moment().date())
    const [actualYear, setActualYear] = useState<number>(moment().year())
    const hour = `${moment().hour()}:${moment().minutes()}`
    const [selectDay, setSelectDay] = useState<{day: string, hour: string}>({day: `${actualYear}-${month}-${day}`, hour})

    return {day, setDay, month, setMonth, actualYear, setActualYear, selectDay, setSelectDay}
}