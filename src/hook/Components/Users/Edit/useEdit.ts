import { useState } from "react"
import { useUserActions } from "../../../useUserActions"
import useRoutineIdActions from "../../../useRoutineIdActions"
import { useAppSelector } from "../../../store"

export default function useEdit() {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateRoutinesUser, updateWarmUpUser} = useUserActions()
    const { updateIdGlobal, updateWarmUpIdGlobal} = useRoutineIdActions()
    const [inputs, setInputs] = useState<{admin?:boolean, pay?:boolean, ban?:boolean}>()
    const [pending, setPending] = useState<boolean>(false)
    const { id } = useAppSelector(state => state.user)

    return {
        createRoutine,
        setCreateRoutine,
        createWarm,
        setCreateWarm,
        updateRoutinesUser,
        updateWarmUpUser,
        updateIdGlobal,
        updateWarmUpIdGlobal,
        inputs,
        setInputs,
        pending,
        setPending,
        id
    }
}