/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { InputsRegister } from "../../../types";
import { labels, namesElements, typesElement } from "../../../const";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import onSubmit from "../../../services/form/onSubmit";
import FormElement from "../FormElement";
import { getId } from "../../../services/getId";
import { useUserActions } from "../../../hook/useUserActions";
import useLoaders from "../../../hook/Components/useLoaders";
import Loader from "../../Loader";

export default function FormRegister() {
    const [inputs, setInputs] = useState<InputsRegister>()
    const url = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const { addUser } = useUserActions()
    const { loader, setLoader } = useLoaders()

    useEffect(() => {
        const { id } = params
        getId(id, navigate)
        const gymName = params.gymName
        if (gymName) {
            setInputs(prevInputs => { return { ...prevInputs, gymName } })
        }
    }, [])

    return (
        !loader.state ?
            <form onSubmit={(event) => onSubmit({ event, inputs, navigate, addUser, url, setLoader })}>
                {url.pathname.includes("admin") ?
                    <FormElement labelName={labels.gymName} type={typesElement.text} name={namesElements.gymName} setInputs={setInputs}></FormElement>
                    :
                    <></>
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
            </form>
            :
            <Loader text={loader.reason ? loader.reason : ''} />
    )
}