import axios from "axios"
import sweetAlert from "../../services/swartAlert"
import { WarmUp } from "../../store/warmUp/slice"
import { basicLoaders, specificLoaders } from "../../const"
import { WarmUpsUser } from "../../store/user/slice"
import { SetLoader, UsersComponent } from "../../types"

interface otherUsersProps {
    userId: string
    setViewRoutineOtherUser: (value: React.SetStateAction<{
        id: string;
    }[] | undefined>) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
    chagenOtherRoutine: boolean
    updateWarmUpIdGlobal: (id: string | undefined) => void
    // id: string
    warmUpActual: ((Days: WarmUp) => void)
    setChangeOtherRoutine: (value: React.SetStateAction<boolean>) => void
}

interface getWarmUpProps {
    id: string
    warmUpActual: ((Days: WarmUp) => void)
    setLoader: (value: React.SetStateAction<string | undefined>) => void
}

interface deleteWarmUpProps {
    id: string | undefined
    updateWarmUpUser: (warmUps: WarmUpsUser) => void
    userId: string | null
    updateWarmUpIdGlobal: (id: string | undefined) => void
    setLoader: SetLoader
    setUsers?: React.Dispatch<React.SetStateAction<UsersComponent>>
}

interface modifiedExerciseProps {
    setOpen: (value: React.SetStateAction<boolean>) => void
    setLoader: SetLoader
    inputs: {
        name?: string | undefined;
        series?: number | undefined;
        reps?: string | undefined;
    }
    exerciseId?: string
    setWarmUpAdmin: boolean
    warmUpActual: (Days: WarmUp) => void
    warmUpId: string
}

const otherUserWarmUp = ({
    userId,
    setViewRoutineOtherUser,
    setLoader,
    chagenOtherRoutine,
    updateWarmUpIdGlobal,
    // id,
    warmUpActual,
    setChangeOtherRoutine
}: otherUsersProps) => {
    try {
        axios.get(`/user/getOneUser/${userId}`).then((response) => {
            console.log(response.data)
            const warmUpsUser = response.data.WarmUps
            setViewRoutineOtherUser(warmUpsUser)
            if (warmUpsUser.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
                const id = warmUpsUser[warmUpsUser.length - 1].id
                if (!chagenOtherRoutine) {
                    updateWarmUpIdGlobal(warmUpsUser[warmUpsUser.length - 1].id)
                }
                axios.get(`/calentamiento/${id}`)
                    .then(response => {
                        warmUpActual(response.data)
                        setChangeOtherRoutine(false)
                        setLoader(undefined)
                    })
            } else {
                warmUpActual({ Days: undefined })
            }
        })
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.data.Error)
    }
}

const getWarmUp = async ({ id, warmUpActual, setLoader }: getWarmUpProps) => {
    try {
        setLoader(`${basicLoaders.loading} ${specificLoaders.warm}`)
        axios.get(`/calentamiento/${id}`)
            .then(response => {
                warmUpActual(response.data)
                setLoader(undefined)
            })
    } catch (error: any) {
        sweetAlert(error.data.Error)
    }
}

async function deleteWarmup({ id, userId, updateWarmUpUser, updateWarmUpIdGlobal, setLoader, setUsers }: deleteWarmUpProps) {
    try {
        setLoader(`${basicLoaders.remove} ${specificLoaders.warm}`)
        await axios.delete(`/calentamiento/delete/${id}`)
        const user = await axios.get(`/user/getOneUser/${userId}`)
        updateWarmUpUser(user.data)
        if (setUsers) {
            const users = await axios.get(`/user/forGym/${user.data.Gym.name}`)
            const lastId = users.data.WarmUps[user.data.WarmUps.length - 1]?.id
            setUsers(users.data)
            updateWarmUpIdGlobal(lastId)
        }
        const lastId = user.data.WarmUps[user.data.WarmUps.length - 1]?.id
        updateWarmUpIdGlobal(lastId)
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error)
    }
}

async function modifiedExerciseWarmUp({ setOpen, setLoader, inputs, exerciseId, setWarmUpAdmin, warmUpActual, warmUpId }: modifiedExerciseProps) {
    try {
        setOpen(false)
        setLoader(`${basicLoaders.save} ${specificLoaders.cahnges}`)
        await axios.put('/ejercicio', { ...inputs, id: exerciseId })
        if (setWarmUpAdmin && warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        else if (warmUpActual) {
            const warmUp = await axios.get(`/calentamiento/${warmUpId}`)
            warmUpActual(warmUp.data)
        }
        setLoader(undefined)
    } catch (error: any) {
        sweetAlert(error.response.data.Error)
    }
}



export { getWarmUp, otherUserWarmUp, deleteWarmup, modifiedExerciseWarmUp }