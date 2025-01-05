import { TableSubscriptionProps } from "../../types"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme"

export default function TableSubscription({ Payments }: TableSubscriptionProps) {
    return (
        <TableContainer className='rounded overflow-auto w-96 max-h-120 max-w-6xl ll:max-w-smd ll:max-h-120'>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Día</StyledTableCell>
                        <StyledTableCell align="center">Hora</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Payments.map(payment => {
                        const day = payment.date.split('-')
                        const hour = payment.hour.split(':')
                        return (
                            <StyledTableRow key={payment.id}>
                                <StyledTableCell align="center">{`${day[2]} - ${day[1]}`}</StyledTableCell>
                                <StyledTableCell align="center">{`${hour[0]} : ${hour[2]}`}</StyledTableCell>
                                <StyledTableCell align="center">{payment.amount}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}