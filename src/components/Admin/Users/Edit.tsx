import Switch from '@mui/material/Switch';
import CreateRoutine from '../../Routine/CreateRoutine';
import { UsersComponent } from '../../../types';
import submitChanges from '../../../services/editForm/submitChanges';
import Loader from '../../Loader';
import { loaders } from '../../../const';
import useEdit from '../../../hook/Components/Users/Edit/useEdit';

export default function Edit({ userId, gymName, setUsers, admin, ban, subscription, setEdit}: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
    admin: boolean
    ban: boolean
    subscription: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const {
        createRoutine,
        setCreateRoutine,
        createWarm,
        setCreateWarm,
        inputs,
        setInputs,
        create,
        setCreate,
        updateRoutinesUser,
        updateWarmUpUser,
        updateIdGlobal,
        updateWarmUpIdGlobal,
        id
    } = useEdit()
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.checked
        setInputs(prev => {return {...prev, [name]: value}})
    }
    return (
        <>
            <menu>
                <form onSubmit={(e) => submitChanges({e, inputs, userId, gymName, setUsers, setCreate, setEdit})}>
                    <label>
                        Admin:
                        <Switch name='admin' onChange={(e) => change(e)} defaultChecked={admin ? true : false}/>
                    </label>
                    <label>
                        Suscripción:
                        <Switch name='pay' onChange={(e) => change(e)} defaultChecked={subscription ? true : false}/>
                    </label>
                    <label>
                        Ban:
                        <Switch name='ban' onChange={(e) => change(e)} defaultChecked={ban ? true : false}/>
                    </label>
                    <button>Guardar cambios</button>
                </form>
                <button onClick={() => setCreateWarm(prev => !prev)}>Crear calentamiento</button>
                <button onClick={() => setCreateRoutine(prev => !prev)}>Crear rutina</button>
            </menu>
            {createRoutine ?
                <CreateRoutine
                    updateRoutinesUser={updateRoutinesUser}
                    updateIdGlobal={updateIdGlobal}
                    userId={userId}
                    setOpenCreateRouitine={setCreateRoutine}
                    gymName={gymName}
                    setUsers={setUsers} 
                    id={id} />
                :
                <></>
            }
            {createWarm ?
                <CreateRoutine
                    updateWarmUpUser={updateWarmUpUser}
                    updateWarmUpIdGlobal={updateWarmUpIdGlobal}
                    userId={userId}
                    setOpenCreateRouitine={setCreateWarm}
                    gymName={gymName}
                    setUsers={setUsers}
                    createWarm={createWarm}
                    id={id} />
                :
                <></>
            }
            {create ? 
                <Loader text={loaders.save}/>
                :
                <></>
            }
        </>
    )
}