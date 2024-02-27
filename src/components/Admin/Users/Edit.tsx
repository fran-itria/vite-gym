import Switch from '@mui/material/Switch';
import { useState } from 'react';
import CreateRoutine from '../../Routine/CreateRoutine';
import { UsersComponent } from '../../../types';
import { useUserActions } from '../../../hook/useUserActions';
import useRoutineIdActions from '../../../hook/useRoutineIdActions';

export default function Edit({ userId, gymName, setUsers }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
}) {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateRoutinesUser, updateWarmUpUser} = useUserActions()
    const { updateIdGlobal, updateWarmUpIdGlobal} = useRoutineIdActions()

    return (
        <>
            {userId}
            <menu>
                <label>
                    Admin:
                    <Switch />
                </label>
                <label>
                    Suscripción:
                    <Switch />
                </label>
                <label>
                    Ban:
                    <Switch />
                </label>
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
                    setUsers={setUsers} />
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
                    createWarm={createWarm} />
                :
                <></>
            }
        </>
    )
}