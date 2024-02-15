/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect } from "react"
import useInformation from "./useInformation"

const useGetRoutine = () => {
    const { routineId, routineActual } = useInformation()
    useEffect(() => {
        axios.get(`/rutina/${routineId}`)
            .then(response => {
                routineActual(response.data)
            })
            .catch(error => console.log(error))
    }, [])
}

export default useGetRoutine