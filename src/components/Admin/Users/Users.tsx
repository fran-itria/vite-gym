/* eslint-disable react-hooks/exhaustive-deps */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import { ThemeProvider } from "styled-components";
import theme, { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme";
import Loader from "../../Loader";
import Edit from "./Edit";
import useUsers from "../../../hook/Components/Users/useUsers";

export default function Users() {
    const {
        Gym,
        admin,
        ban,
        edit,
        setAdmin,
        setBan,
        setEdit,
        setSubscription,
        setUserId,
        setUsers,
        subscription,
        userId,
        users,
        loader,
        setLoader,
        copy
    } = useUsers()

    const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value.toLowerCase()
        if (name) {
            setUsers(copy.filter(user => user.name.toLowerCase().includes(name)))
        }
        else {
            setUsers(copy)
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                <input onChange={(e) => filterUsers(e)} placeholder='Usuario'></input>
                            </StyledTableCell>
                            <StyledTableCell align="center"> Nombre </StyledTableCell>
                            <StyledTableCell align="center"> Apellido </StyledTableCell>
                            <StyledTableCell align="center"> Teléfono </StyledTableCell>
                            <StyledTableCell align="center"> Contacto emergencia </StyledTableCell>
                            <StyledTableCell align="center"> Admin </StyledTableCell>
                            <StyledTableCell align="center"> Calentamientos </StyledTableCell>
                            <StyledTableCell align="center"> Rutinas </StyledTableCell>
                            <StyledTableCell align="center"> Suscripción </StyledTableCell>
                            <StyledTableCell align="center"> Ban </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {users.length > 0 ?
                        <TableBody>
                            {users.map(user => (
                                <>
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell align="center">
                                            <ThemeProvider theme={theme}>
                                                <CreateIcon onClick={() => {
                                                    setUserId(user.id)
                                                    setAdmin(user.admin)
                                                    setBan(user.ban)
                                                    setSubscription(user.pay)
                                                    setEdit(prev => !prev)
                                                }} sx={{ color: theme.palette.pencil.main }} />
                                            </ThemeProvider>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{user.name}</StyledTableCell>
                                        <StyledTableCell align="center">{user.surname}</StyledTableCell>
                                        <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                        <StyledTableCell align="center">{user.contactEmergency}</StyledTableCell>
                                        <StyledTableCell align="center">{user.admin ? '✅' : '❌'}</StyledTableCell>
                                        <StyledTableCell align="center">{user.WarmUps.length}</StyledTableCell>
                                        <StyledTableCell align="center">{user.Routines.length}</StyledTableCell>
                                        <StyledTableCell align="center">{user.pay ? '✅' : '❌'}</StyledTableCell>
                                        <StyledTableCell align="center">{user.ban ? '✅' : '❌'}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            ))}
                        </TableBody>
                        :
                        <p>No tienes usuarios registrados</p>
                    }
                </Table>
            </TableContainer>
            {edit ?
                <Edit
                    userId={userId}
                    setUsers={setUsers}
                    gymName={Gym?.name}
                    admin={admin}
                    ban={ban}
                    subscription={subscription}
                    setEdit={setEdit}
                    setLoader={setLoader}
                />
                :
                <></>}
            {loader ? <Loader text={loader} /> : <></>}
        </>
    )
}