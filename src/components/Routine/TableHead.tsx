/* eslint-disable @typescript-eslint/no-explicit-any */
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../../themeIcons/customTheme';


export default function TableHeadComponent({ weeks }: { weeks?: number | null }) {
    const totalWeeks = new Array(weeks).fill(0)
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" />
                <StyledTableCell align="center">Video</StyledTableCell>
                <StyledTableCell align="center">Ejercicio</StyledTableCell>
                <StyledTableCell align="center">Series</StyledTableCell>
                <StyledTableCell align="center">Repeticiones</StyledTableCell>
                {weeks ? totalWeeks.map((_week, i: number) => <StyledTableCell align="center">Semana {i + 1}</StyledTableCell>) : <></>}
            </TableRow>
        </TableHead>
    )
}