/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useUserActions } from "../../../hook/useUserActions";
import { useAppSelector } from "../../../hook/store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useCalendar() {
    const [month, setMonth] = useState<number>(moment().month())
    const [day, setDay] = useState<number>(moment().date())
    const [actualYear, setActualYear] = useState<number>(moment().year())
    const hour = `${moment().hour()}:${moment().minutes()}`
    const [selectDay, setSelectDay] = useState<{ day: string, hour: string }>({ day: `${actualYear}-${month}-${day}`, hour })
    const { updateShiftsUser } = useUserActions()
    const { id, GymId, Shifts } = useAppSelector(state => state.user)
    const [hoursRange, setHoursRange] = useState<{ day: string, hour: string }[]>()
    const [defaultTime, setDefaultTime] = useState<string>()

    useEffect(() => {
        async function getShiftsHours() {
            const dayParam = `${actualYear}-${month < 10 ? `0${month + 1}` : month}-${day < 10 ? `0${day}` : day}`
            const hours = await axios.get(`/shift/${GymId}/${dayParam}`)
            setHoursRange(hours.data)
        }
        getShiftsHours()
    }, [day, Shifts])

    return {
        day,
        setDay,
        month,
        setMonth,
        actualYear,
        setActualYear,
        selectDay,
        setSelectDay,
        updateShiftsUser,
        id,
        GymId,
        hoursRange,
        defaultTime,
        setDefaultTime
    }
}