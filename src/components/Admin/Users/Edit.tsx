import Switch from '@mui/material/Switch';
import CreateRoutine from '../../Routine/CreateRoutine';
import { SetLoader, UsersComponent } from '../../../types';
import submitChanges from '../../../services/editForm/submitChanges';
import useEdit from '../../../hook/Components/Users/Edit/useEdit';

export default function Edit({ userId, gymName, setUsers, admin, ban, subscription, setEdit, setLoader }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
    admin: boolean
    ban: boolean
    subscription: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setLoader: SetLoader
}) {
    const {
        createRoutine,
        setCreateRoutine,
        createWarm,
        setCreateWarm,
        inputs,
        setInputs,
        updateRoutinesUser,
        updateWarmUpUser,
        updateIdGlobal,
        updateWarmUpIdGlobal,
        id
    } = useEdit()
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.checked
        setInputs(prev => { return { ...prev, [name]: value } })
    }
    return (
        <>
            <menu>
                <form onSubmit={(e) => submitChanges({ e, inputs, userId, gymName, setUsers, setLoader, setEdit })}>
                    <label>
                        Admin:
                        <Switch name='admin' onChange={(e) => change(e)} defaultChecked={admin ? true : false} />
                    </label>
                    <label>
                        Suscripción:
                        <Switch name='pay' onChange={(e) => change(e)} defaultChecked={subscription ? true : false} />
                    </label>
                    <label>
                        Ban:
                        <Switch name='ban' onChange={(e) => change(e)} defaultChecked={ban ? true : false} />
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
                    id={id ? id : undefined}
                    setLoader={setLoader}
                />
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
                    id={id ? id : undefined}
                    setLoader={setLoader}
                />
                :
                <></>
            }
        </>
    )
}