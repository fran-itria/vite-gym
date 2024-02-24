import { useEffect, useState } from "react"
import { UsersComponent } from "../../../types"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useAppSelector } from "../../../hook/store";
import CreateIcon from '@mui/icons-material/Create';
import { ThemeProvider } from "styled-components";
import theme, { StyledTableCell, StyledTableRow } from "../../../themeIcons/customTheme";
import Loader from "../../Loader";
import Edit from "./Edit";

export default function Users() {
    const [users, setUsers] = useState<UsersComponent>([])
    const { Gym } = useAppSelector(state => state.user)
    const [edit, setEdit] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')
    useEffect(() => {
        console.log(Gym)
        axios.get(`/user/forGym/${Gym?.name}`).then(
            response => {
                if (response.status == 200) {
                    setUsers(response.data)
                }
            }
        )
    }, [])
    return (
        users.length > 0 ?
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center"></StyledTableCell>
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
                        <TableBody>
                            {users.map(user => (
                                <>
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell align="center">
                                            <ThemeProvider theme={theme}>
                                                <CreateIcon onClick={() => {
                                                    setUserId(user.id)
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
                    </Table>
                </TableContainer>
                {edit ?
                    <Edit userId={userId} setUsers={setUsers} gymName={Gym?.name} /> :
                    <></>}
            </>
            :
            <Loader text="Cargando usuarios" />
    )
}