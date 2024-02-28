import { useState } from "react";
import { useAppSelector } from "../../hook/store"
import { Extra, InputsCreateTraining } from "../../types"
import DetailsExtra from "./DeatilsExtra"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormCreateTraining from "./FormCreateTraining";
import Loader from "../Loader";
import { loaders } from "../../const";
import useLoaders from "../../hook/Components/useLoaders";



export default function Training(){
    const { ExtraTrainings } = useAppSelector(state => state.user)
    const [training, setTraining] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [trainId, setTrainId] = useState<string>()
    const [defaultValues, setDefaultValues] = useState<InputsCreateTraining>()
    const {create, setCreate, save, setSave, remove, setRemove} = useLoaders()
    
    return (
        <>
            {ExtraTrainings.length > 0 ?
            <>
                {ExtraTrainings.map((extra: Extra) => {
                    return <DetailsExtra 
                                extra={extra} 
                                setRemove={setRemove} 
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
                <FormCreateTraining setTraining={setTraining} setCreate={setCreate}/> 
                : edit ? 
                    <FormCreateTraining trainId={trainId} defaultValues={defaultValues} setEdit={setEdit} setSave={setSave}/>
                    :
                    <></>}
            {create ? 
                <Loader text={loaders.createTraining}/> 
                : remove ? 
                    <Loader text={loaders.deleteTraining}/> 
                    : save ? <Loader text={loaders.save}/> 
                        : <></>
            }
        </>
        )
    }