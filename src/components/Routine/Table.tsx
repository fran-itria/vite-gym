/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exercise, TableComponentProps } from '../../types';
import TableHead from './TableHead';
import TableRow from './TableRow/TableRow';

export default function Table({ day, weeks, routineActual, routineId, warmUpActual, warmUpId }: TableComponentProps) {
    return (
        <table>
            <>
                <TableHead weeks={weeks ? weeks : undefined} />
                <tbody>
                    {day.Exercises.map((exercise: Exercise) => {
                        return (
                            <TableRow
                                key={exercise.id}
                                id={exercise.id}
                                name={exercise.name}
                                series={exercise.series}
                                reps={exercise.reps}
                                Loads={exercise.Loads ? exercise.Loads : undefined}
                                weeks={weeks ? weeks : undefined}
                                routineActual={routineActual}
                                routineId={routineId}
                                warmUpActual={warmUpActual}
                                warmUpId={warmUpId}
                            />
                        )
                    })
                    }
                </tbody>
            </>
        </table >
    )
}