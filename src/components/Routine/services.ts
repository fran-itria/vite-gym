import axios from "axios";
import { Routine } from "../../store/routine/slice";
import { basicLoaders, specificLoaders } from "../../const";
import sweetAlert from "../../services/swartAlert";

interface otherUsersProps {
    userId: string
    setViewRoutineOtherUser: (value: React.SetStateAction<{
        id: string;
    }[] | undefined>) => void
    setLoader: (value: React.SetStateAction<string | undefined>) => void
    chagenOtherRoutine: boolean
    updateRoutineId: (id: string | undefined) => void
    routineActual: ((Days: Routine) => void)
    setChangeOtherRoutine: (value: React.SetStateAction<boolean>) => void
}

interface getRoutineProps {
    id: string
    routineActual: ((Days: Routine) => void)
    setLoader: (value: React.SetStateAction<string | undefined>) => void
}

const otherUserRoutine = ({
    userId,
    setViewRoutineOtherUser,
    setLoader,
    chagenOtherRoutine,
    updateRoutineId,
    routineActual,
    setChangeOtherRoutine
}: otherUsersProps) => {
    try {
        axios.get(`/user/getOneUser/${userId}`).then((response) => {
            const routinesUser = response.data.Routines
            setViewRoutineOtherUser(routinesUser)
            if (routinesUser.length > 0) {
                setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
                const id = routinesUser[routinesUser.length - 1].id
                if (!chagenOtherRoutine) {
                    updateRoutineId(routinesUser[routinesUser.length - 1].id)
                }
                axios.get(`/rutina/${id}`)
                    .then(response => {
                        routineActual(response.data)
                        setChangeOtherRoutine(false)
                        setLoader(undefined)
                    })
            } else {
                routineActual({ Days: undefined, weeks: 0 })
            }
        })
    } catch (error: any) {
        setLoader(undefined)
        sweetAlert(error.data.Error)
    }
}

const getRoutine = async ({ id, routineActual, setLoader }: getRoutineProps) => {
    try {
        setLoader(`${basicLoaders.loading} ${specificLoaders.routine}`)
        axios.get(`/rutina/${id}`)
            .then(response => {
                routineActual(response.data)
                setLoader(undefined)
            })
    } catch (error: any) {
        sweetAlert(error.data.Error)
    }
}

export { otherUserRoutine, getRoutine }