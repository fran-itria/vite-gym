/* eslint-disable @typescript-eslint/no-explicit-any */

export default function TableHead({ weeks }: { weeks?: number | null }) {
    const totalWeeks = new Array(weeks).fill(0)
    return (
        <thead>
            <tr>
                <th></th>
                <th>Video</th>
                <th>Ejercicio</th>
                <th>Series</th>
                <th>Repeticiones</th>
                {weeks ? totalWeeks.map((_week, i: number) => <th>Semana {i + 1}</th>) : <></>}
            </tr>
        </thead>
    )
}