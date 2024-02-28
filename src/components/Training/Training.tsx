import { useState } from "react";
import { useAppSelector } from "../../hook/store"
import { Extra, InputsCreateTraining } from "../../types"
import DetailsExtra from "./DeatilsExtra"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormCreateTraining from "./FormCreateTraining";
import Loader from "../Loader";
import { loaders } from "../../const";



export default function Training(){
    const { ExtraTrainings } = useAppSelector(state => state.user)
    const [training, setTraining] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [pending, setPending] = useState<boolean>(false)
    const [deleteTraining, setDelete] = useState<boolean>(false)
    const [trainId, setTrainId] = useState<string>()
    const [defaultValues, setDefaultValues] = useState<InputsCreateTraining>()
    const [save, setSave] = useState<boolean>(false)
    
    return (
        <>
            {ExtraTrainings.length > 0 ?
            <>
                {ExtraTrainings.map((extra: Extra) => {
                    return <DetailsExtra 
                                extra={extra} 
                                setDelete={setDelete} 
                                setEdit={setEdit} 
                                setTrainId={setTrainId} 
                                setDefaultValues={setDefaultValues}
                                key={extra.id}
                            />
                })}
                <AddCircleIcon color="success" onClick={() => setTraining(prev => !prev)}/>
            </>
            :
            <>
                <p>No tienes ejercicios registrados</p>
                <AddCircleIcon color="success" onClick={() => setTraining(true)}/>
            </>
            }
            {training ? 
                <FormCreateTraining setTraining={setTraining} setPending={setPending}/> 
                : edit ? 
                    <FormCreateTraining trainId={trainId} defaultValues={defaultValues} setEdit={setEdit} setSave={setSave}/>
                    :
                    <></>}
            {pending ? 
                <Loader text={loaders.createTraining}/> 
                : deleteTraining ? 
                    <Loader text={loaders.deleteTraining}/> 
                    : save ? <Loader text={loaders.saveTraining}/> 
                        : <></>
            }
        </>
        )
    }