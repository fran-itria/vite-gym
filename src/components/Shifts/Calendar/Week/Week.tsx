import { week } from "../../Const";


export default function Week() {

    return (
        <>
            {week.map(day => {
                return <div className="flex items-center justify-center ">
                    <p className="font-bold">{day.toLocaleUpperCase()}</p>
                </div>
            })}
        </>
    )
}