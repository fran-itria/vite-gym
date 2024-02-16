/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exercise, TableComponentProps } from '../../types';
import TableHead from './TableHead';
import TableRow from './TableRow/TableRow';

export default function Table({ day, weeks }: TableComponentProps) {
    return (
        <table>
            <TableHead weeks={weeks} />
            <tbody>
                {day.Exercises.map((exercise: Exercise) => {
                    return (
                        <TableRow
                            key={exercise.id}
                            id={exercise.id}
                            name={exercise.name}
                            series={exercise.series}
                            reps={exercise.reps}
                            Loads={exercise.Loads}
                            weeks={weeks}
                        />
                    )
                })
                }
            </tbody>
        </table>
    )
}