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
                <div className='
                    w-full 
                    h-full 
                    flex 
                    flex-col 
                    justify-center 
                    items-center
                    background
                    ll:p-1
                '>
                    {loader && <Loader text={loader} />}
                    <section className=" 
                        flex 
                        flex-col 
                        justify-between 
                        h-97 
                        rounded 
                        p-11
                        ll:p-4 
                        shadow-xl 
                        shadow-black
                        background
                    ">
                        <h2 className="p-0 m-0 mb-8 text-gray-800 text-2xl font-bold dark:text-white"> Pro Active Center</h2>
                        <form
                            onSubmit={(event) => onSubmit({ event, inputs, navigate, addUser, url, setLoader, handleOpen, setMail })}
                            className="grid grid-cols-2 gap-x-4 gap-y-1"
                        >
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
                            <FormElement labelName={labels.confirmPassword} type={typesElement.password} name={namesElements.confimrPassword} setInputs={setInputs}></FormElement>
                            <button className="button h-8">
                                Registrarme
                            </button>
                        </form>
                    </section>
                </div >
            }
            <Modal open={open}>
                <div className="flex justify-center items-center h-screen ll:p-4">
                    <div className="p-4 rounded bg-gray-300 text-gray-900 dark:text-white dark:bg-cyan-950 flex flex-col items-center">
                        <b>
                            Se ha enviado un correo a <b>{mail}</b>, por favor coloque el codigo proporcionado para verificar su cuenta
                        </b>
                        <input
                            type="number"
                            onChange={(e) => setTemporalCode(e.target.value.toString())}
                            placeholder="Código"
                            className="ll:w-16 focus:border-b-gray-800 placeholder:text-black rounded mt-5 mb-5 p-1 text-black dark:text-white dark:placeholder:text-white" />
                        <button
                            onClick={() => checkCode(navigate, addUser, mail, temporalCode, setLoader)}
                            className="
                                    bg-gray-100
                                    hover:bg-gray-500
                                    text-black
                                    hover:text-white 
                                    p-1.5 
                                    rounded 
                                    border-none
                                    font-bold
                                    dark:bg-cyan-800
                                    dark:hover:bg-gray-900
                                    dark:text-white 
                                "
                        >Verificar</button>
                    </div>
                </div>
            </Modal >
        </>
    )
}