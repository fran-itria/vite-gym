import { week } from "../../Const";
import style from './Week.module.css'


export default function Week() {

    return (
        <>
            {week.map(day => {
                return <div className={style.days}>
                    <p className={style.daysText}>{day.toLocaleUpperCase()}</p>
                </div>
            })}
        </>
    )
}