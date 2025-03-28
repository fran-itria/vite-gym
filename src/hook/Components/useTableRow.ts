import { useState } from "react"

export default function useTabelRow() {
    const [open, setOpen] = useState<boolean>(false)
    const [openLoad, setOpenLoad] = useState<boolean>(false)
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [load, setLoad] = useState<string | undefined>(undefined)
    const [idLoad, setIdLoad] = useState<string>('')
    const [newLoads, setNewLoads] = useState<string>('')
    const [weekLoad, setWeekLoad] = useState<number>(0)

    return {
        open,
        setOpen,
        openLoad,
        setOpenLoad,
        confirmDelete,
        setConfirmDelete,
        load,
        setLoad,
        idLoad,
        setIdLoad,
        newLoads,
        setNewLoads,
        weekLoad,
        setWeekLoad
    }
}