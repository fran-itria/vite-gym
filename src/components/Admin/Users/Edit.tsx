import Switch from '@mui/material/Switch';
import CreateRoutine from '../../Routine/CreateRoutine';
import { CaseResolve, SetLoader, UsersComponent } from '../../../types';
import submitChanges from '../../../services/editForm/submitChanges';
import useEdit from '../../../hook/Components/Users/Edit/useEdit';
import Detail from '../../Routine/Detail';
import useDayCreate from '../../../hook/Components/Routine/useCreateDay';
import FormTotalExercise from '../../Routine/FormTotalExercise';
import FormOneDay from '../../Routine/CraeteOneDay/FormOneDay';
import TableConfirmDay from '../../Routine/CraeteOneDay/TableConfirmDay';
import { change, getOneRoutine, getOneWarmUp, getRoutinesUser, getWarmUpsUser } from './functions';

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
        id,
        modal,
        setModal,
        routineAdmin,
        setRoutineAdmin,
        saw,
        setSaw,
        routinesUser,
        setRoutinesUser,
        selectId,
        setId,
    } = useEdit()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const warmUp = 'Calentamiento'
    const routine = 'Rutina'

    return (
        <>
            <menu>
                <form onSubmit={(e) => submitChanges({ e, inputs, userId, gymName, setUsers, setLoader, setEdit })}>
                    <label>
                        Admin:
                        <Switch name='admin' onChange={(e) => change({ e, setInputs })} defaultChecked={admin ? true : false} />
                    </label>
                    <label>
                        Suscripción:
                        <Switch name='pay' onChange={(e) => change({ e, setInputs })} defaultChecked={subscription ? true : false} />
                    </label>
                    <label>
                        Ban:
                        <Switch name='ban' onChange={(e) => change({ e, setInputs })} defaultChecked={ban ? true : false} />
                    </label>
                    <button>Guardar cambios</button>
                </form>
                <button onClick={() => {
                    getWarmUpsUser({ id: userId, setRoutinesUser })
                    setModal((prev) => {
                        if (prev != '') return ''
                        else return warmUp
                    })
                    setRoutineAdmin(undefined)
                }}>
                    Calentamientos
                </button>
                <button onClick={() => {
                    getRoutinesUser({ id: userId, setRoutinesUser })
                    setModal((prev) => {
                        if (prev != '') return ''
                        else return routine
                    })
                    setRoutineAdmin(undefined)
                }}>
                    Rutinas
                </button>
                <button onClick={() => setCreateWarm(prev => !prev)}>Crear calentamiento</button>
                <button onClick={() => setCreateRoutine(prev => !prev)}>Crear rutina</button>
                <button onClick={() => setEdit(false)}>❌</button>
            </menu>
            {modal != '' ?
                routinesUser?.length && routinesUser?.length > 0 ?
                    modal == warmUp ?
                        <select onChange={(e) => {
                            getOneWarmUp({ id: e.target.value, setId, setLoader, setRoutineAdmin, setRoutinesUser })
                            setSaw(true)
                        }}>
                            <option value=''>Seleccionar calentamiento</option>
                            {routinesUser?.map((warmUp, index) =>
                                <option value={warmUp.id}>Calentamiento {index + 1}</option>
                            )}
                        </select>
                        :
                        <select onChange={(e) => {
                            getOneRoutine({ id: e.target.value, setId, setLoader, setRoutineAdmin, setRoutinesUser })
                            setSaw(true)
                        }}>
                            <option value=''>Seleccionar rutina</option>
                            {routinesUser?.map((warmUp, index) =>
                                <option value={warmUp.id}>Rutina {index + 1}</option>
                            )}
                        </select>
                    :
                    <>No hay {modal?.toLowerCase()}s existentes</>
                :
                <></>
            }
            {saw ?
                modal == warmUp ?
                    (
                        routineAdmin?.Days && routineAdmin.Days.length > 0 ?
                            <>
                                {routineAdmin.Days.map((day, i) => {
                                    return (
                                        <Detail
                                            day={day}
                                            i={i}
                                            routineOrWarmUp={{ routineId: selectId }}
                                            setLoader={setLoader}
                                            setRoutineAdmin={setRoutineAdmin}
                                            caseResolve={CaseResolve.calentamiento}
                                        />
                                    )
                                })}
                                <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                                <button onClick={() => setSaw(false)}>❌</button>
                            </>
                            :
                            <></>
                    )
                    :
                    modal == routine ?
                        (
                            routineAdmin?.Days && routineAdmin.Days.length > 0 ?
                                <>
                                    {routineAdmin.Days.map((day, i) => {
                                        return (
                                            <Detail
                                                day={day}
                                                i={i}
                                                routineOrWarmUp={{ weeks: routineAdmin.weeks, routineId: selectId }}
                                                setLoader={setLoader}
                                                setRoutineAdmin={setRoutineAdmin}
                                                caseResolve={CaseResolve.rutina}
                                            />
                                        )
                                    })}
                                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                                    <button onClick={() => setSaw(false)}>❌</button>
                                </>
                                :
                                <></>
                        )
                        :
                        <></>
                : <></>
            }
            {addDay ?
                <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={routineAdmin} />
                :
                pag != 0 ?
                    pag < Number(totalExercise) + 1 ?
                        <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} />
                        :
                        <TableConfirmDay
                            key={selectId}
                            dayCreate={dayCreate}
                            setAddDay={setAddDay}
                            setDayCreate={setDayCreate}
                            setPag={setPag}
                            setTotalExercise={setTotalExercise}
                            routine={routineAdmin}
                            routineId={selectId}
                            setLoader={setLoader}
                            setRoutineAdmin={setRoutineAdmin}
                        />
                    :
                    <></>
            }
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
                    updateIdGlobal={updateIdGlobal}
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