import { year, next, prev } from "../../Const"
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
        <main className="flex w-52 px-4 items-center justify-around bg-cyan-800 rounded-full h-11">
            <ArrowCircleLeftIcon sx={{ color: 'white' }} onClick={() => handleMonth(prev)} />
            <p className="font-bold text-2xl"> {month !== undefined ? year[month].month.toLocaleUpperCase() : <></>} </p>
            <ArrowCircleRightIcon sx={{ color: 'white' }} onClick={() => handleMonth(next)} />
        </main>
    )
}