import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme";
import { useState } from 'react';


type payment = {
    id: string;
    date: string;
    hour: string;
    amount: string;
    User: {
        name: string;
        surname: string;
    };
}[]

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
    const [filterPayments, setFilterPayments] = useState<payment>(payments)
    const filterPaymentsFuntcion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value.toLowerCase()
        if (name) {
            setFilterPayments(filterPayments.filter(payment => payment.User.name.toLowerCase().includes(name)))
        }
        else {
            setFilterPayments(payments)
        }
    }

    return (
        <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            Nombre
                            <input
                                onChange={(e) => filterPaymentsFuntcion(e)}
                                placeholder='Usuario'
                                className='rounded w-16 placeholder:text-black dark:placeholder:text-white placeholder:text-center'></input>
                        </StyledTableCell>
                        <StyledTableCell align="center">Apellido</StyledTableCell>
                        <StyledTableCell align="center">Fecha</StyledTableCell>
                        <StyledTableCell align="center">Hora</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterPayments.map(payment => {
                        const date = payment.date.split('-')
                        const hour = payment.hour.split(':')
                        const dateString = `${date[2]} - ${date[1]}`
                        const hourString = `${hour[0]} : ${hour[1]}`
                        return (
                            <StyledTableRow key={payment.id}>
                                <StyledTableCell align="center">{payment.User.name}</StyledTableCell>
                                <StyledTableCell align="center">{payment.User.surname}</StyledTableCell>
                                <StyledTableCell align="center">{dateString}</StyledTableCell>
                                <StyledTableCell align="center">{hourString}</StyledTableCell>
                                <StyledTableCell align="center">{payment.amount}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}