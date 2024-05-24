/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export const getGyms = async (setGyms: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
}[]>>) => {
    try {
        const response = await axios.get('/gym')
        setGyms(response.data)
    } catch (error: any) {
        window.alert(error.response.data.Error)
    }
}

export const change = async (id: string | null, valueGym: string | undefined, updateGymUser: (gymName: string, gymId: string) => void) => {
    const response = await axios.put(`/user`, { id, newGymId: valueGym })
    const gymName = response.data.Gym.name
    const gymId = response.data.Gym.id
    updateGymUser(gymName, gymId)
}