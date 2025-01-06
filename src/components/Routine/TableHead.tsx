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
                <StyledTableCell align="center"><b>Video</b></StyledTableCell>
                <StyledTableCell align="center"><b>Ejercicio</b></StyledTableCell>
                <StyledTableCell align="center"><b>Series</b></StyledTableCell>
                <StyledTableCell align="center"><b>Repeticiones</b></StyledTableCell>
                {weeks ? totalWeeks.map((_week, i: number) => <StyledTableCell align="center">Semana {i + 1}</StyledTableCell>) : <></>}
            </TableRow>
        </TableHead>
    )
}