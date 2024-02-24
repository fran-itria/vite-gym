import Switch from '@mui/material/Switch';
import { useState } from 'react';
import CreateRoutine from '../../Routine/CreateRoutine';
import { UsersComponent } from '../../../types';

export default function Edit({ userId, gymName, setUsers }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
}) {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
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
                <button onClick={() => setCreateRoutine(prev => !prev)}>Crear rutina</button>
            </menu>
            {createRoutine ?
                <CreateRoutine userId={userId} setOpenCreateRouitine={setCreateRoutine} gymName={gymName} setUsers={setUsers} />
                :
                <></>
            }
        </>
    )
}