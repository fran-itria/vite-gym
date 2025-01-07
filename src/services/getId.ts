import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import sweetAlert from "./swartAlert";

export const getId = (id: string | undefined, navigate: NavigateFunction) => {
    axios.get(`/idregistro/${id}`)
        .then(response => {
            if (response.status == 200) {
                axios.delete(`/idregistro/delete/${id}`)
            }
        })
        .catch(error => {
            sweetAlert(`${error.response.data.Error}:
            El link de registro ya fue utilizado`)
            navigate("/")
        })
}