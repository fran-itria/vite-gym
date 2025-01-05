import { week } from "../../Const";


export default function Week() {

    return (
        <>
            {week.map(day => {
                return <div className="flex items-center justify-center ">
                    <b className="text-black dark:text-white">{day.toLocaleUpperCase()}</b>
                </div>
            })}
        </>
    )
}