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
            <div className='p-4 ll:p-0 h-full flex flex-col items-center justify-center'>
                <div className='ll:w-full'>
                    <p className='border p-2 rounded mb-2 border-black border-2 font-bold dark:border-white dark:text-white w-fit ll:ml-2'>Total de usuarios:
                        <b className='ml-2'>{users.length}</b>
                    </p>
                </div>
                <TableContainer className='rounded overflow-auto w-full max-h-100 max-w-6xl ll:max-w-smd ll:max-h-120'>
                    <Table aria-label="customized table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">
                                    <div className='flex flex-col items-center w-28'>
                                        <b>Nombre</b>
                                        <input
                                            onChange={(e) => filterUsers(e)}
                                            placeholder='Usuario'
                                            className='
                                                rounded 
                                                w-16
                                                placeholder:text-white 
                                                placeholder:text-center
                                            '
                                        >
                                        </input>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center"> <b>Apellido</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Suscripción</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Ban</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Admin</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Rutinas</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Calentamientos</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Teléfono</b> </StyledTableCell>
                                <StyledTableCell align="center"> <b>Contacto emergencia</b> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ?
                                users.map(user => (
                                    <>
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell align="center">
                                                <div className='w-full flex justify-center'>
                                                    <button onClick={() => {
                                                        setUserId(user.id)
                                                        setAdmin(user.admin)
                                                        setBan(user.ban)
                                                        setSubscription(user.pay)
                                                        setEdit({ state: true, warmUps: user.WarmUps.length, routines: user.Routines.length })
                                                        setEmail(user.email)
                                                    }}
                                                        className='flex button w-full items-between'
                                                    >
                                                        <ThemeProvider theme={theme}>
                                                            <CreateIcon sx={{ color: theme.palette.pencil.main }} />
                                                        </ThemeProvider>
                                                        <b className='ml-2 dark:text-white'>{user.name}</b>
                                                    </button>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.surname}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.pay ? '✅' : '❌'}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.ban ? '✅' : '❌'}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.admin ? '✅' : '❌'}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.Routines.length}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.WarmUps.length}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.phone}</b></StyledTableCell>
                                            <StyledTableCell align="center"><b>{user.contactEmergency}</b></StyledTableCell>
                                        </StyledTableRow>
                                    </>
                                ))
                                :
                                <StyledTableRow>
                                    <StyledTableCell align='center' colSpan={9}>
                                        <p>No hay usuarios registrados</p>
                                    </StyledTableCell>
                                </StyledTableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}