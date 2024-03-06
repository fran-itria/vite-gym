import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme";



export default function TablePayments({ payments }: {
    payments: {
        id: string
        date: string;
        hour: string;
        amount: string;
        User: {
            name: string;
            surname: string;
        };
    }[]
}) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: '50%' }}>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Apellido</StyledTableCell>
                        <StyledTableCell align="center">Fecha</StyledTableCell>
                        <StyledTableCell align="center">Hora</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map(payment => {
                        return (
                            <StyledTableRow key={payment.id}>
                                <StyledTableCell align="center">{payment.User.name}</StyledTableCell>
                                <StyledTableCell align="center">{payment.User.surname}</StyledTableCell>
                                <StyledTableCell align="center">{payment.date}</StyledTableCell>
                                <StyledTableCell align="center">{payment.hour}</StyledTableCell>
                                <StyledTableCell align="center">{payment.amount}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}