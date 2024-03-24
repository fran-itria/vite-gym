/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import Loader from "../Loader"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import style from './Register.module.css'
import useLoaders from "../../hook/Components/useLoaders"
import { basicLoaders, specificLoaders } from "../../const";

export default function Register() {
    const [link, setLink] = useState<string>()
    const [allIds, setAllIds] = useState<{ id: string, gym: string }[]>()
    const { Gym } = useAppSelector(state => state.user)
    const { loader, setLoader } = useLoaders()
    const baseUrl = `http://127.0.0.1:5173/register/${Gym?.name}/`

    const createLink = async () => {
        const id = await axios.post('/idRegistro', { gym: Gym?.name })
        console.log(id.data)
        setLink(baseUrl + id.data.id)
    }

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setLoader({ state: true, reason: `${basicLoaders.loading} ${specificLoaders.register}` })
        const all = async () => {
            try {
                const response = await axios.get('/idRegistro')
                setLoader({ state: false })
                setAllIds(response.data)
            } catch (error) {
                setLoader({ state: false })
                console.log(error)
            }
        }
        all()
    }, [])

    return (
        <>
            <button onClick={() => createLink()}>Crear link de registro</button>
            <p>Nuevo link creado: {link ? link : <></>}</p>
            {
                allIds && allIds?.length > 0 ?
                    <div className={style.table}>
                        <p>Links de registros creados: </p>
                        <div className={style.links}>
                            {allIds?.filter(id => id.gym == Gym?.name).map(id => {
                                return (
                                    <div className={style.link}>
                                        <p>{baseUrl + id.id}</p>
                                        <ContentCopyIcon onClick={() => { copy(baseUrl + id.id) }} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <p>No hay links creados</p>
            }
            {loader && loader.reason ? <Loader text={loader.reason} /> : <></>}
        </>
    )
}