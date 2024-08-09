import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function AcceptUser(){
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const userId = params.get('userId')
    const gymId = params.get('gymId')
    const [user, setUser] = useState<{name?: string, surname?: string, user?: string, email?: string}>({})
    const [gym, setGym] = useState<string>()
    useEffect(() => {
        axios.get(`/user/getOneUser/${userId}`).then(res => {
            const name = res.data.name
            const surname = res.data.surname
            const user = res.data.user
            const email = res.data.email
            setUser(prev => {return {...prev, name, surname, user, email}})
        }
    )
    axios.get(`/gym/getGymId/${gymId}`).then(res => {
            const name = res.data.name
            setGym(name)
    })
    }, [])

    const accept = async() => {
        try {
            const mail = await axios.post('/mails/confirmChangeGymUser', {user: user.user, email: user.email, gym})
            const changeUser = await axios.put('/user', {id: userId, ban: null, newGymId: gymId})
            if(mail.status == 200 && changeUser.status == 200){
                window.alert('Usuario aceptado')
            }
        } catch (error) {
            console.log(error)
            window.alert('Error al aceptar usuario')
        }
    }

    return (
        <div>
         <h3>{user.name} {user.surname} quiere incorporarse a {gym}</h3>
         <h5>¿Desea aceptarlo?</h5>
         <button onClick={() => accept()}>Aceptar</button>
        </div>
    )
}