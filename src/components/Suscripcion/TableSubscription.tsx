import { TableSubscriptionProps } from "../../types"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme"

export default function TableSubscription({ Payments }: TableSubscriptionProps) {
    return (
        Payments.length > 0 &&
        <TableContainer className='rounded overflow-auto w-96 max-h-120 max-w-6xl ll:max-w-smd ll:max-h-120'>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center"><b>Gym</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Día</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Hora</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Monto</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Payments.map(payment => {
                        const day = payment.date.split('-')
                        const hour = payment.hour.split(':')
                        return (
                            <StyledTableRow key={payment.id}>
                                <StyledTableCell align="center"><b>{payment.Gym.name}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{`${day[2]} - ${day[1]}`}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{`${hour[0]} : ${hour[2]}`}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{payment.amount}</b></StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}