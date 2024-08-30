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
                    bg-gradient-to-t  
                    from-gray-300
                    via-gray-500
                    to-gray-300 
                    dark:bg-gradient-to-t 
                    dark:from-gray-800
                    dark:via-cyan-900
                    dark:to-gray-800
                '>
                    <Modal open={Boolean(loader)}>
                        <>
                            {loader && <Loader text={loader} />}
                        </>
                    </Modal>
                    <section className=" 
                        flex 
                        flex-col 
                        justify-between 
                        h-97 
                        rounded 
                        p-11 
                        shadow-xl 
                        shadow-black
                        bg-gradient-to-t  
                        from-gray-300
                        via-gray-500
                        to-gray-300 
                        dark:bg-gradient-to-t 
                        dark:from-gray-800
                        dark:via-cyan-900
                        dark:to-gray-800
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
                            <button className="
                                    h-8
                                    flex
                                    justify-center
                                    items-center
                                    bg-gray-300
                                    hover:bg-gray-500
                                    hover:text-white 
                                    text-gray-800 
                                    p-1.5 
                                    rounded 
                                    border-none 
                                    dark:hover:bg-gray-900
                                    dark:text-white 
                                    dark:bg-cyan-800
                                    dark:hover:bg-cyan-950
                                ">
                                Registrarme
                            </button>
                        </form>
                    </section>
                </div >
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