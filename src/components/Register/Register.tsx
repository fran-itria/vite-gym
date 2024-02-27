import axios from "axios"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hook/store"
import Loader from "../Loader"
import { loaders } from "../../const"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import style from './Register.module.css'

export default function Register(){
    const [link, setLink] = useState<string>()
    const [allIds, setAllIds] = useState<{id: string, gym: string}[]>()
    const { Gym } = useAppSelector(state => state.user)
    const [pending, setPending] = useState<boolean>(false)
    const baseUrl = `http://127.0.0.1:5173/register/${Gym.name}/`

    const create = async() => {
        const id = await axios.post('/idRegistro', {gym: Gym.name})
        console.log(id.data)
        setLink(baseUrl+id.data.id)
    }

    const copy = (text: string) => {
            navigator.clipboard.writeText(text)
                .then(response => console.log(response))
                .catch(error => console.log(error))
    }

    useEffect(() => {
        setPending(true)
        const all = async() => {
            try {
                const response = await axios.get('/idRegistro')
                setPending(false)
                setAllIds(response.data)
            } catch (error) {
                setPending(false)
                console.log(error)
            }
        }
        all()
    }, [])

    return(
        <>
            <button onClick={() => create()}>Crear link de registro</button>
            <p>Nuevo link creado: {link ? link : <></>}</p>
            {
                allIds && allIds?.length > 0 ?
                    <div className={style.table}>
                        <p>Links de registros creados: </p>
                        <div className={style.links}>
                            {allIds?.filter(id => id.gym == Gym.name).map(id => {
                                return(
                                    <div className={style.link}>
                                        <p>{baseUrl+id.id}</p>
                                        <ContentCopyIcon onClick={() => {copy(baseUrl+id.id)}}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :
                <p>No hay links creados</p>
            }
            {pending ? 
                <Loader text={loaders.links}/>
                :
                <></>}
        </>
    )
}