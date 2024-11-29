import { useState } from "react"
import { useUserActions } from "../../../useUserActions"
import useRoutineIdActions from "../../../useRoutineIdActions"
import { useAppSelector } from "../../../store"
import { Routine } from "../../../../store/routine/slice"
import { CaseResolve } from "../../../../types"

export default function useEdit() {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateRoutinesUser, updateWarmUpUser } = useUserActions()
    const { updateIdGlobal } = useRoutineIdActions()
    const [inputs, setInputs] = useState<{ admin?: boolean, pay?: boolean, ban?: string | null | boolean }>()
    const { id } = useAppSelector(state => state.user)

    const [modal, setModal] = useState<CaseResolve | undefined>(undefined)
    const [routinesUser, setRoutinesUser] = useState<{ id: string }[]>()
    const [routineAdmin, setRoutineAdmin] = useState<Routine>()

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
        routinesUser,
        setRoutinesUser,
        routineAdmin,
        setRoutineAdmin
    }
}