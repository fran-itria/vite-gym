/* eslint-disable react-hooks/exhaustive-deps */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
        copy,
        email,
        setEmail
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
            <>
                {loader
                    ? <Loader text={loader} />
                    : edit.state && <Edit
                        userId={userId}
                        setUsers={setUsers}
                        gymName={Gym?.name}
                        admin={admin}
                        ban={ban}
                        subscription={subscription}
                        setEdit={setEdit}
                        edit={edit}
                        setLoader={setLoader}
                        email={email}
                    />}
            </>
            <div className='h-full flex flex-col items-center justify-center'>
                {users.length > 1 &&
                    <div className='ll:w-full'>
                        <p className='border p-2 rounded mb-2 border-black border-2 font-bold dark:border-white dark:text-white w-fit ll:ml-2'>Total de usuarios:
                            <b className='ml-2'>{users.length}</b>
                        </p>
                    </div>
                }
                <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
                    <Table aria-label="customized table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" className='flex flex-col'>
                                    <p>Nombre</p>
                                    <input onChange={(e) => filterUsers(e)} placeholder='Usuario' className='rounded w-16 placeholder:text-black dark:placeholder:text-white placeholder:text-center'></input>
                                </StyledTableCell>
                                <StyledTableCell align="center"> Apellido </StyledTableCell>
                                <StyledTableCell align="center"> Suscripción </StyledTableCell>
                                <StyledTableCell align="center"> Ban </StyledTableCell>
                                <StyledTableCell align="center"> Admin </StyledTableCell>
                                <StyledTableCell align="center"> Rutinas </StyledTableCell>
                                <StyledTableCell align="center"> Calentamientos </StyledTableCell>
                                <StyledTableCell align="center"> Teléfono </StyledTableCell>
                                <StyledTableCell align="center"> Contacto emergencia </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {users.length > 0 ?
                            <TableBody>
                                {users.map(user => (
                                    <>
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell align="center" className='w-20'>
                                                <div className='w-full flex justify-center'>
                                                    <button onClick={() => {
                                                        setUserId(user.id)
                                                        setAdmin(user.admin)
                                                        setBan(user.ban)
                                                        setSubscription(user.pay)
                                                        setEdit({ state: true, warmUps: user.WarmUps.length, routines: user.Routines.length })
                                                        setEmail(user.email)
                                                    }}
                                                        className='flex button w-full justify-center items-center'
                                                    >
                                                        <ThemeProvider theme={theme}>
                                                            <CreateIcon sx={{ color: theme.palette.pencil.main }} />
                                                        </ThemeProvider>
                                                        <p className='ml-2 text-white'>{user.name}</p>
                                                    </button>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{user.surname}</StyledTableCell>
                                            <StyledTableCell align="center">{user.pay ? '✅' : '❌'}</StyledTableCell>
                                            <StyledTableCell align="center">{user.ban ? '✅' : '❌'}</StyledTableCell>
                                            <StyledTableCell align="center">{user.admin ? '✅' : '❌'}</StyledTableCell>
                                            <StyledTableCell align="center">{user.Routines.length}</StyledTableCell>
                                            <StyledTableCell align="center">{user.WarmUps.length}</StyledTableCell>
                                            <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                            <StyledTableCell align="center">{user.contactEmergency}</StyledTableCell>
                                        </StyledTableRow>
                                    </>
                                ))}
                            </TableBody>
                            :
                            <p>No tienes usuarios registrados</p>
                        }
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}