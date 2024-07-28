import { useState } from "react";
import { useAppSelector } from "../../hook/store"
import { Extra, InputsCreateTraining } from "../../types"
import DetailsExtra from "./DeatilsExtra"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormCreateTraining from "./FormCreateTraining";
import Loader from "../Loader";
import useLoaders from "../../hook/Components/useLoaders";



export default function Training() {
    const { ExtraTrainings } = useAppSelector(state => state.user)
    const [training, setTraining] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [trainId, setTrainId] = useState<string>()
    const [defaultValues, setDefaultValues] = useState<InputsCreateTraining>()
    const { loader, setLoader } = useLoaders()

    return (
        <>
            {ExtraTrainings.length > 0 ?
                <>
                    {ExtraTrainings.map((extra: Extra) => {
                        return <DetailsExtra
                            extra={extra}
                            setLoader={setLoader}
                            setEdit={setEdit}
                            setTrainId={setTrainId}
                            setDefaultValues={setDefaultValues}
                            key={extra.id}
                        />
                    })}
                    <AddCircleIcon color="success" onClick={() => setTraining(prev => !prev)} />
                </>
                :
                <>
                    <p>No tienes ejercicios registrados</p>
                    <AddCircleIcon color="success" onClick={() => setTraining(true)} />
                </>
            }
            {training ?
                <FormCreateTraining setTraining={setTraining} setLoader={setLoader} />
                : edit ?
                    <FormCreateTraining trainId={trainId} defaultValues={defaultValues} setEdit={setEdit} setLoader={setLoader} />
                    :
                    <></>}
            {loader ? <Loader text={loader} /> : <></>}
        </>
    )
}