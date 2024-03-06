import { TableSubscriptionProps } from "../../types"
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import theme, { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme"
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider } from "styled-components"
import deleteSubscription from "../../services/subscription/deleteSubscription"

export default function TableSubscription({ Payments, id, updatePaymentsUser }: TableSubscriptionProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Día</StyledTableCell>
                        <StyledTableCell align="center">Hora</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Payments.map(payment => {
                        return (
                            <StyledTableRow key={payment.id}>
                                <StyledTableCell align="center">{payment.date}</StyledTableCell>
                                <StyledTableCell align="center">{payment.hour}</StyledTableCell>
                                <StyledTableCell align="center">{payment.amount}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ThemeProvider theme={theme}>
                                        <DeleteIcon
                                            sx={{ color: theme.palette.tashIcon.main }}
                                            onClick={() => deleteSubscription({ id: payment.id, updatePaymentsUser, userId: id })}>
                                        </DeleteIcon>
                                    </ThemeProvider>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}