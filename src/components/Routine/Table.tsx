/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableComponentProps } from '../../types';
import TableHead from './TableHead';
import TableRow from './TableRow';

export default function Table({ day, weeks }: TableComponentProps) {
    return (
        <table>
            <TableHead weeks={weeks} />
            <tbody>
                {day.Exercises.map((exercise: any) => {
                    return (
                        <>
                            <TableRow exercise={exercise} />
                        </>
                    )
                })
                }
            </tbody>
        </table>
    )
}