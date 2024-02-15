/* eslint-disable @typescript-eslint/no-explicit-any */

export default function TableHead({ weeksLoads }: { weeksLoads: any }) {
    return (
        <thead>
            <tr>
                <th>Ejercicio</th>
                <th>Series</th>
                <th>Repeticiones</th>
                {weeksLoads.map((_week: any, i: number) => (<th>Semana {i + 1}</th>))}
            </tr>
        </thead>
    )
}