/* eslint-disable react-hooks/exhaustive-deps */
import { labels, namesElements, typesElement } from "../../../const";
import onSubmit from "../../../services/form/onSubmit";
import FormElement from "../FormElement";
import Loader from "../../Loader";
import { Modal } from "@mui/material";
import useForm from "./useForm";
import checkCode from "./checkCode";

export default function FormRegister() {
    const { inputs, setInputs, url, navigate, addUser, loader, setLoader, open, handleOpen, mail, setMail, temporalCode, setTemporalCode } = useForm()
    return (
        <>
            {
                !loader.state ?
                    <form onSubmit={(event) => onSubmit({ event, inputs, navigate, addUser, url, setLoader, handleOpen, setMail })}>
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
            }
            <Modal open={open}>
                <div style={{ background: 'black' }}>
                    <p style={{ color: 'white' }}>
                        Se ha enviado un correo a {mail}, por favor coloque el codigo proporcionado para verificar su cuenta
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ color: 'white' }}>CODIGO</h3>
                        <input type="number" onChange={(e) => setTemporalCode(e.target.value.toString())} />
                        <button onClick={() => checkCode(navigate, addUser, mail, temporalCode, setLoader)}>Verificar</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}