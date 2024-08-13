/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { InputsLogin, InputsRegister } from "../../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getId } from "../../../services/getId";
import { useUserActions } from "../../../hook/useUserActions";

export default function useForm() {
    const [inputs, setInputs] = useState<InputsRegister | InputsLogin>()
    const url = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const { addUser } = useUserActions()
    const [loader, setLoader] = useState<string>()

    const [open, setOpen] = useState(false)
    const [mail, setMail] = useState('')
    const [temporalCode, setTemporalCode] = useState('')
    const handleOpen = () => {
        setOpen(true);
    }
    useEffect(() => {
        const { id } = params
        getId(id, navigate)
        const gymName = params.gymName
        if (gymName) {
            setInputs(prevInputs => { return { ...prevInputs, gymName } })
        }
    }, [])

    return { inputs, setInputs, url, navigate, addUser, loader, setLoader, open, handleOpen, mail, setMail, temporalCode, setTemporalCode }
}