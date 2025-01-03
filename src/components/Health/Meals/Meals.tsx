import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '../../../hook/store';
import Details from './Details';
import { useState } from 'react';
import FormCreate from './FormCreate';
import Loader from '../../Loader';
import { InputsCreateFood } from '../../../types';
import { Modal } from '@mui/material';

export default function Meals() {
    const { Meals } = useAppSelector(state => state.user)
    const [add, setAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [values, setValues] = useState<InputsCreateFood>()
    const [mealId, setMealId] = useState<string>()
    const [loader, setLoader] = useState<string>()

    return (
        <>
            {loader && <Loader text={loader} />}
            {Meals.length > 0 ?
                <div className='flex flex-col items-center'>
                    <Details
                        Meals={Meals}
                        setLoader={setLoader}
                        setMealId={setMealId}
                        setValues={setValues}
                        setEdit={setEdit}
                    />
                    <AddCircleIcon color="success" fontSize='large' onClick={() => setAdd(!add)} className='mt-3 hover:cursor-pointer' />
                </div>
                :
                <div className='flex flex-col items-center'>
                    <b>No hay comidas registradas</b>
                    <AddCircleIcon color="success" fontSize='large' onClick={() => setAdd(!add)} className='mt-3 hover:cursor-pointer' />
                </div>
            }
            {
                (add || edit) &&
                <Modal open={add || edit} className='flex justify-center items-center'>
                    <>
                        {add
                            ?
                            <FormCreate setAdd={setAdd} setLoader={setLoader} />
                            :
                            edit &&
                            < FormCreate mealId={mealId} values={values} setEdit={setEdit} setLoader={setLoader} />
                        }
                    </>
                </Modal>
            }
        </>
    )
}