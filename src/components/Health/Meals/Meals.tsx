import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '../../../hook/store';
import Details from './Details';
import { useState } from 'react';
import FormCreate from './FormCreate';
import Loader from '../../Loader';
import { InputsCreateFood, MealProps } from '../../../types';
import useLoaders from '../../../hook/Components/useLoaders';

export default function Meals() {
    const { Meals } = useAppSelector(state => state.user)
    const [add, setAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [values, setValues] = useState<InputsCreateFood>()
    const [mealId, setMealId] = useState<string>()
    const { loader, setLoader } = useLoaders()

    return (
        <>
            {Meals.length > 0 ?
                <>
                    {Meals.map((meal: MealProps) => {
                        return (
                            <Details
                                meal={meal}
                                setLoader={setLoader}
                                setMealId={setMealId}
                                setValues={setValues}
                                setEdit={setEdit}
                                key={meal.id}
                            />
                        )
                    }
                    )}
                    <AddCircleIcon color="success" onClick={() => setAdd(!add)} />
                </>
                :
                <>
                    <p>No hay comidas registradas</p>
                    <AddCircleIcon color="success" onClick={() => setAdd(!add)} />
                </>
            }
            {add ?
                <FormCreate setAdd={setAdd} setLoader={setLoader} />
                : edit ? <FormCreate mealId={mealId} values={values} setEdit={setEdit} setLoader={setLoader} />
                    : <></>
            }
            {loader ? <Loader text={loader} /> : <></>}
        </>
    )
}