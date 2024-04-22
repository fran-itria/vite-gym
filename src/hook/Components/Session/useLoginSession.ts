import { useEffect } from "react"
import { storage } from "../../../const"
import { login } from "../../../services/login/login"
import { useUserActions } from "../../useUserActions"
import { useNavigate } from "react-router-dom"


export const useLoginSession = () => {
    const { addUser } = useUserActions()
    const navigate = useNavigate()
    useEffect(() => {
        if (storage.getItem('user') && storage.getItem('password')) {
          const user = storage.getItem('user')
          const password = storage.getItem('password')
          login({ user, password }).then(response => {
            addUser(response.data.user)
            navigate(`/home/${response.data.user.id}/resumen`);
          })
        }
      }, [])
}