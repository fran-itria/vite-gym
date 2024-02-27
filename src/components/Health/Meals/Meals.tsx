import AddCircleIcon from '@mui/icons-material/AddCircle';
import style from "../Health.module.css";
import { useAppSelector } from '../../../hook/store';
import Details from './Details';
import { useState } from 'react';
import FormCreate from './FormCreate';
import Loader from '../../Loader';
import { loaders } from '../../../const';
import { MealProps } from '../../../types';

export default function Meals(){
    const { Meals } = useAppSelector(state => state.user)
    const [add, setAdd] = useState<boolean>(false)
    const [create, setCreate] = useState<boolean>(false)
    const [deleteMeal, setDeleteMeal] = useState<boolean>(false)

    return (
        <>
            <ul className={style.days}>
                {Meals.length > 0 ? 
                    <>
                        {Meals.map((meal: MealProps) => {
                            return (
                                <Details meal={meal} setDeleteMeal={setDeleteMeal} key={meal.id}/>
                                )
                            } 
                            )}
                        <AddCircleIcon color="success" onClick={() => setAdd(!add)}/>
                    </>
                    :
                    <>
                      <p>No hay comidas registradas</p>
                      <AddCircleIcon color="success" onClick={() => setAdd(!add)}/>
                    </>
                }
            </ul>
            {add ? <FormCreate setAdd={setAdd} setCreate={setCreate}/> : <></> }
            {create ? <Loader text={loaders.createMeal}/> : deleteMeal ? <Loader text={loaders.deleteMeal}/> : <></>}
        </>
    )
}