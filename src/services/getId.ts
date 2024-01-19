import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const getId = (id: string | undefined, navigate: NavigateFunction) => {
    axios.get(`/idregistro/${id}`)
        .then(response => {
            if (response.status == 200) {
                axios.delete(`/idregistro/delete/${id}`)
            }
        })
        .catch(error => {
            window.alert(error.response.data.Error)
            navigate("/")
        })
}