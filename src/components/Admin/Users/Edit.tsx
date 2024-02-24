import Switch from '@mui/material/Switch';
import { useState } from 'react';
import CreateRoutine from '../../Routine/CreateRoutine';
import { UsersComponent } from '../../../types';
import { useUserActions } from '../../../hook/useUserActions';
import { useRoutineActions } from '../../../hook/useRoutineActions';

export default function Edit({ userId, gymName, setUsers }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
}) {
    const [createRoutine, setCreateRoutine] = useState<boolean>(false)
    const [createWarm, setCreateWarm] = useState<boolean>(false)
    const { updateRoutinesUser } = useUserActions()
    const { routineActual } = useRoutineActions()

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
                    routineActual={routineActual}
                    updateRoutinesUser={updateRoutinesUser}
                    userId={userId}
                    setOpenCreateRouitine={setCreateRoutine}
                    gymName={gymName}
                    setUsers={setUsers} />
                :
                <></>
            }
            {createWarm ?
                <CreateRoutine
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