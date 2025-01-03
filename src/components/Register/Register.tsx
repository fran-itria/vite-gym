/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { basicLoaders, specificLoaders } from "../../const";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from "../../themeIcons/customTheme";

export default function Register({ setLoader }: { setLoader: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const [link, setLink] = useState<string>()
    const [allIds, setAllIds] = useState<{ id: string, gym: string }[]>()
    const { Gym } = useAppSelector(state => state.user)
    const baseUrl = `https://pro-active-center.vercel.app/register/${Gym?.name}/`

    const createLink = async () => {
        setLoader(`${basicLoaders.create} ${specificLoaders.link}`);
        const id = await axios.post('/idRegistro', { gym: Gym?.name })
        setLink(`${baseUrl}` + id.data.id)
        setLoader(undefined)
    }

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    useEffect(() => {
        setLoader(`${basicLoaders.loading} ${specificLoaders.register}`);
        (async () => {
            try {
                const response = await axios.get('/idRegistro')
                setLoader(undefined)
                setAllIds(response.data)
            } catch (error) {
                setLoader(undefined)
            }
        })()
    }, [Gym, link])

    return (
        <div className="h-full flex flex-col items-center mb-5">
            <button onClick={() => createLink()} className="button w-48 mt-3 h-7">Crear link de registro</button>
            {
                allIds && allIds?.length > 0 &&
                <div className="mt-3 mb-3">
                    <TableContainer className="ll:max-w-smd max-h-72 rounded">
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Link de registros</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allIds?.filter(id => id.gym == Gym?.name).map(id => {
                                    return (
                                        <StyledTableRow key={id.id}>
                                            <StyledTableCell>
                                                <div key={id.id}>
                                                    <b>{baseUrl + id.id}</b>
                                                    <ContentCopyIcon
                                                        className="cursor-pointer ml-5"
                                                        onClick={() => { copy(baseUrl + id.id) }} />
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    )
}