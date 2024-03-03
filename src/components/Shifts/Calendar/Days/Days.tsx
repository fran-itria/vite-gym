import { year } from "../../Const"
import moment from "moment";
import style from './Days.module.css'
import { useMemo } from "react";
import { DaysProps } from "../../../../types";

export default function Days({ month, day, setDay, actualYear }: DaysProps) {
    const daysInMonth = useMemo<(number | undefined)[]>(() => {
        const startDate = moment().date(1).month(month).year(actualYear).startOf("month").weekday();
        const daysInMonth = [...Array(year[month].days).keys()]
        return [...Array(startDate), ...daysInMonth];
    }, [month])

    return (
        <>
            {month !== undefined ? daysInMonth.map((i, index) => {
                if (i === undefined) return (
                    <div></div>
                );
                return (
                    <div
                        className={i == (day - 1) ? style.daySelected : (index) % 7 === 0 ? style.dayOff : style.dayMonth}
                        onClick={() => setDay(i + 1)}>
                        <p className={style.dayMonthText}>
                            {(i + 1).toString().length < 2 && "0"}{i + 1}
                        </p>
                    </div>
                )
            }) : <></>}
        </>
    )
}