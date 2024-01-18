import { useState, useEffect } from "react";
import { InputsRegister } from "../../../types";
import axios from "axios";
import { baseUrl, labels, namesElements, typesElement } from "../../../const";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import onSubmit from "../../../services/onSubmit";
import FormElement from "../FormElement";

export default function FormRegister() {
    const [gyms, setGyms] = useState<{ id: string, name: string }[]>()
    const [inputs, setInputs] = useState<InputsRegister>()
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${baseUrl}/gym`).then(response => setGyms(response.data))
    }, [])

    return (
        <form onSubmit={(event) => onSubmit({ event, inputs, navigate, url })}>
            {url.pathname.includes("admin") ?
                <FormElement labelName={labels.gymName} type={typesElement.text} name={namesElements.gymName} setInputs={setInputs}></FormElement>
                :
                <FormElement labelName={labels.gymName} type={typesElement.text} name={namesElements.gymName} setInputs={setInputs} gyms={gyms}></FormElement>
            }
            <FormElement labelName={labels.age} type={typesElement.number} name={namesElements.age} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.name} type={typesElement.text} name={namesElements.name} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.surname} type={typesElement.text} name={namesElements.surname} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.dni} type={typesElement.number} name={namesElements.dni} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.email} type={typesElement.email} name={namesElements.email} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.phone} type={typesElement.tel} name={namesElements.phone} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.contactEmergency} type={typesElement.tel} name={namesElements.contactEmergency} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.user} type={typesElement.text} name={namesElements.user} setInputs={setInputs}></FormElement>
            <FormElement labelName={labels.password} type={typesElement.password} name={namesElements.password} setInputs={setInputs}></FormElement>
            <button>Registrarme</button>
            <NavLink to={"/"}>Iniciar sesión</NavLink>
        </form>
    )
}