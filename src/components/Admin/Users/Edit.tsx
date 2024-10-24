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
import { useState } from 'react';
import { Modal } from '@mui/material';

export default function Edit({ userId, gymName, setUsers, admin, ban, subscription, setEdit, edit, setLoader, email }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
    admin: boolean
    ban: boolean
    subscription: boolean
    setEdit: React.Dispatch<React.SetStateAction<{
        state: boolean;
        warmUps?: number;
        routines?: number;
    }>>
    edit: {
        state: boolean;
        warmUps?: number;
        routines?: number;
    }
    setLoader: SetLoader
    email: string
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
    const [banMotive, setBanMotive] = useState<boolean>(ban)

    return (
        <>
            <Modal open>
                <menu>
                    <form onSubmit={(e) => submitChanges({ e, inputs, userId, gymName, setUsers, setLoader, setEdit, email })}>
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
                            <Switch
                                name='banMotive'
                                onChange={() => {
                                    setBanMotive(prev => !prev)
                                    if (banMotive) {
                                        setInputs(prev => { return { ...prev, ban: null } })
                                    }
                                }
                                }
                                defaultChecked={ban ? true : false}
                            />
                            {inputs?.ban ?
                                <>
                                    <p>{inputs.ban}</p>
                                    <button onClick={() => setBanMotive(prev => !prev)}>Editar ban</button>
                                </> : <></>}
                        </label>
                        <button>Guardar cambios</button>
                    </form>
                    <button className={edit.warmUps == 0 ? 'opacity-25 pointer-events-none' : 'pointer-events-auto'} onClick={() => {
                        getWarmUpsUser({ id: userId, setRoutinesUser })
                        setModal((prev) => {
                            if (prev != '') return ''
                            else return warmUp
                        })
                        setRoutineAdmin(undefined)
                    }}>
                        Calentamientos
                    </button>
                    <button className={edit.warmUps == 0 ? 'opacity-25 pointer-events-none' : 'pointer-events-auto'} onClick={() => {
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
                    <button onClick={() => setEdit({ state: false })}>❌</button>
                </menu>
            </Modal>
            {banMotive ?
                <>
                    <Modal open>
                        <>
                            <input name='ban' placeholder='Motivo del ban' onChange={(e) => change({ e, setInputs })} />
                            <button onClick={() => setBanMotive(false)}>Guardar ban</button>
                            <button onClick={() => setBanMotive(false)}>❌</button>
                        </>
                    </Modal>
                </>
                : <></>
            }
            {modal != '' ?
                routinesUser?.length && routinesUser?.length > 0 ?
                    modal == warmUp ?
                        <Modal open={Boolean(warmUp)}>
                            <select onChange={(e) => {
                                getOneWarmUp({ id: e.target.value, setId, setLoader, setRoutineAdmin, setRoutinesUser })
                                setSaw(true)
                            }}>
                                <option value=''>Seleccionar calentamiento</option>
                                {routinesUser?.map((warmUp, index) =>
                                    <option value={warmUp.id}>Calentamiento {index + 1}</option>
                                )}
                            </select>
                        </Modal>
                        :
                        <Modal open={!warmUp}>
                            <select onChange={(e) => {
                                getOneRoutine({ id: e.target.value, setId, setLoader, setRoutineAdmin, setRoutinesUser })
                                setSaw(true)
                            }}>
                                <option value=''>Seleccionar rutina</option>
                                {routinesUser?.map((warmUp, index) =>
                                    <option value={warmUp.id}>Rutina {index + 1}</option>
                                )}
                            </select>
                        </Modal>
                    :
                    <Modal open>
                        <>No hay {modal?.toLowerCase()}s existentes</>
                    </Modal>
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