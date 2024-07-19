import { useState } from "react"
import { useUserActions } from "../../../useUserActions"
import useRoutineIdActions from "../../../useRoutineIdActions"
import { useAppSelector } from "../../../store"
import { Routine } from "../../../../store/routine/slice"

export default function useEdit() {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateRoutinesUser, updateWarmUpUser } = useUserActions()
    const { updateIdGlobal } = useRoutineIdActions()
    const [inputs, setInputs] = useState<{ admin?: boolean, pay?: boolean, ban?: boolean }>()
    const { id } = useAppSelector(state => state.user)

    const [modal, setModal] = useState<string | undefined>('')
    const [saw, setSaw] = useState<boolean>(false)
    const [routinesUser, setRoutinesUser] = useState<{ id: string }[]>()
    const [routineAdmin, setRoutineAdmin] = useState<Routine>()
    const [selectId, setId] = useState<string>()

    return {
        createRoutine,
        setCreateRoutine,
        createWarm,
        setCreateWarm,
        updateRoutinesUser,
        updateWarmUpUser,
        updateIdGlobal,
        inputs,
        setInputs,
        id,
        modal,
        setModal,
        saw,
        setSaw,
        routinesUser,
        setRoutinesUser,
        routineAdmin,
        setRoutineAdmin,
        selectId,
        setId
    }
}