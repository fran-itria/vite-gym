import { useState } from "react";
import { useAppSelector } from "../../hook/store"
import { InputsCreateTraining } from "../../types"
import DetailsExtra from "./DeatilsExtra"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormCreateTraining from "./FormCreateTraining";
import Loader from "../Loader";
import { Modal } from "@mui/material";



export default function Training() {
    const { ExtraTrainings } = useAppSelector(state => state.user)
    const [training, setTraining] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [trainId, setTrainId] = useState<string>()
    const [defaultValues, setDefaultValues] = useState<InputsCreateTraining>()
    const [loader, setLoader] = useState<string>()

    return (
        <>
            {loader && <Loader text={loader} />}
            {ExtraTrainings.length > 0 ?
                <div className='flex flex-col items-center'>
                    <DetailsExtra
                        ExtraTrainings={ExtraTrainings}
                        setLoader={setLoader}
                        setEdit={setEdit}
                        setTrainId={setTrainId}
                        setDefaultValues={setDefaultValues}
                    />
                    <AddCircleIcon fontSize='large' className='mt-3 hover:cursor-pointer' color="success" onClick={() => setTraining(prev => !prev)} />
                </div>
                :
                <div className='flex flex-col items-center'>
                    <b>No tienes ejercicios registrados</b>
                    <AddCircleIcon fontSize='large' className='mt-3 hover:cursor-pointer' color="success" onClick={() => setTraining(true)} />
                </div>
            }
            {(training || edit) &&
                <Modal open={training || edit} className='flex justify-center items-center'>
                    <>
                        {training ?
                            <FormCreateTraining setTraining={setTraining} setLoader={setLoader} />
                            :
                            edit &&
                            <FormCreateTraining trainId={trainId} defaultValues={defaultValues} setEdit={setEdit} setLoader={setLoader} />
                        }
                    </>
                </Modal>
            }
        </>
    )
}