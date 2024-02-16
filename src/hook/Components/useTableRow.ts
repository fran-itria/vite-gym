import { useState } from "react"

export default function useTabelRow() {
    const [open, setOpen] = useState<boolean>(false)
    const [openLoad, setOpenLoad] = useState<boolean>(false)
    const [idExercise, setIdExercise] = useState<string | null>('')
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    return { open, setOpen, openLoad, setOpenLoad, idExercise, setIdExercise, confirmDelete, setConfirmDelete }
}