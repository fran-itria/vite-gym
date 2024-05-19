import Switch from '@mui/material/Switch';
import CreateRoutine from '../../Routine/CreateRoutine';
import { SetLoader, UsersComponent } from '../../../types';
import submitChanges from '../../../services/editForm/submitChanges';
import useEdit from '../../../hook/Components/Users/Edit/useEdit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routine } from '../../../store/routine/slice';
import Detail from '../../Routine/Detail';
import { WarmUp } from '../../../store/warmUp/slice';
import useDayCreate from '../../../hook/Components/Routine/useCreateDay';
import FormTotalExercise from '../../Routine/FormTotalExercise';
import FormOneDay from '../../Routine/CraeteOneDay/FormOneDay';
import TableConfirmDay from '../../Routine/CraeteOneDay/TableConfirmDay';

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
    const [modal, setModal] = useState<string | undefined>('')
    const [saw, setSaw] = useState<boolean>(false)
    const [routinesUser, setRoutinesUser] = useState<{ id: string }[]>()
    const [routineAdmin, setRoutineAdmin] = useState<Routine>()
    const [warmUpAdmin, setWarmUpAdmin] = useState<WarmUp>()
    const [selectId, setId] = useState<string>()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
    const warmUp = 'Calentamiento'
    const routine = 'Rutina'
    useEffect(() => console.log(modal, saw), [modal, saw])

    const getRoutinesUser = async (id: string) => {
        axios.get(`/user/getOneUser/${id}`)
            .then(response => setRoutinesUser(response.data.Routines))
            .catch(error => window.alert(error.message))
    }

    const getWarmUpsUser = async (id: string) => {
        axios.get(`/user/getOneUser/${id}`)
            .then(response => setRoutinesUser(response.data.WarmUps))
            .catch(error => window.alert(error.message))
    }
    const getOneWarmUp = (id: string) => {
        setLoader({ state: true, reason: 'Cargando calentamiento' })
        axios.get(`/calentamiento/${id}`)
            .then(response => {
                setWarmUpAdmin(response.data)
                setLoader({ state: false })
                setId(id)
            })
            .catch(error => window.alert(error.data.Error))
    }
    const getOneRoutine = (id: string) => {
        setLoader({ state: true, reason: 'Cargando rutina' })
        axios.get(`/rutina/${id}`)
            .then(response => {
                setRoutineAdmin(response.data)
                setLoader({ state: false })
                setId(id)
            })
            .catch(error => window.alert(error.data.Error))
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.checked
        setInputs(prev => { return { ...prev, [name]: value } })
    }

    const sawRoutineFunction = (id: string) => {
        if (!saw) {
            setSaw(prev => !prev)
            getOneRoutine(id)
        } else setSaw(prev => !prev)
    }

    const sawWarmUpFunction = (id: string) => {
        if (!saw) {
            setSaw(prev => !prev)
            getOneWarmUp(id)
        } else setSaw(prev => !prev)
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
                <button onClick={() => {
                    getWarmUpsUser(userId)
                    // setModalWarmUps(prev => !prev)
                    setModal((prev) => {
                        if (prev != '') return ''
                        else return warmUp
                    })
                }}>
                    Calentamientos
                </button>
                <button onClick={() => {
                    getRoutinesUser(userId)
                    setModal((prev) => {
                        if (prev != '') return ''
                        else return routine
                    })
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
                        <ol>
                            {routinesUser?.map((warmUp, index) =>
                                <div>
                                    <li>Calentamiento {index + 1}</li>
                                    <button onClick={() => sawWarmUpFunction(warmUp.id)}>
                                        ver
                                    </button>
                                </div>
                            )}
                        </ol>
                        :
                        <ol>
                            {routinesUser?.map((routine, index) =>
                                <div>
                                    <li>Rutina {index + 1}</li>
                                    <button onClick={() => sawRoutineFunction(routine.id)}>
                                        ver
                                    </button>
                                </div>
                            )}
                        </ol>
                    :
                    <></>
                :
                <></>
            }
            {saw ?
                modal == warmUp ?
                    (
                        warmUpAdmin?.Days && warmUpAdmin.Days.length > 0 ?
                            <>
                                {warmUpAdmin.Days.map((day, i) => {
                                    return (
                                        <Detail
                                            day={day}
                                            i={i}
                                            routineOrWarmUp={{ routineId: selectId }}
                                            setLoader={setLoader}
                                            setWarmUpAdmin={setWarmUpAdmin}
                                        />
                                    )
                                })}
                                <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                                <button onClick={() => setSaw(false)}>❌</button>
                            </>
                            :
                            <>No tiene calentamientos creados</>
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
                                            />
                                        )
                                    })}
                                    <button onClick={() => setAddDay(!addDay)}>+ Día</button>
                                    <button onClick={() => setSaw(false)}>❌</button>
                                </>
                                :
                                <>No tiene rutinas creadas</>
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
                            warmUpId={selectId}
                            setLoader={setLoader}
                            setRoutineAdmin={setRoutineAdmin}
                            setWarmUpAdmin={setWarmUpAdmin}
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