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
        <TableContainer className='rounded overflow-auto w-full max-h-48 max-w-6xl ll:max-w-smd ll:max-h-48'>
            <Table size="small" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            <div className='flex flex-col items-center justify-center'>
                                <b>Nombre</b>
                                <input
                                    onChange={(e) => filterPaymentsFuntcion(e)}
                                    placeholder='Usuario'
                                    className='rounded w-16 placeholder:text-white dark:placeholder:text-white placeholder:text-center'></input>
                            </div>
                        </StyledTableCell>
                        <StyledTableCell align="center"><b>Apellido</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Fecha</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Hora</b></StyledTableCell>
                        <StyledTableCell align="center"><b>Monto</b></StyledTableCell>
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
                                <StyledTableCell align="center"><b>{payment.User.name}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{payment.User.surname}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{dateString}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{hourString}</b></StyledTableCell>
                                <StyledTableCell align="center"><b>{payment.amount}</b></StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}