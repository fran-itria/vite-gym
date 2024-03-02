import { year, next, prev } from "../../Const"
import style from "./Month.module.css";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { MonthProps } from "../../../../types";

export default function Month({ month, setMonth, setActualYear }: MonthProps) {

    const handleMonth = (prop: string) => {
        setMonth(month => {
            let nextMonth = prop === next ? month + 1 : month - 1;
            nextMonth = nextMonth % 12
            if (nextMonth < 0) nextMonth += 12;
            return nextMonth
        })
        setActualYear(actualYear => {
            let year = actualYear
            if (prop == next && month == 11) {
                year = actualYear + 1
            } else if (prop == prev && month == 0) {
                year = actualYear - 1
            }
            return year
        })
    }

    return (
        <main className={style.MonthContainer}>
            <ArrowCircleLeftIcon sx={{color: 'black'}} onClick={() => handleMonth(prev)}/>
            <p className={style.Month}> {month !== undefined ? year[month].month.toLocaleUpperCase() : <></>} </p>
            <ArrowCircleRightIcon sx={{color: 'black'}} onClick={() => handleMonth(next)}/>
        </main>
    )
}