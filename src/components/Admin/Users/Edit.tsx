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
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

export default function Edit({ userId, gymName, setUsers, admin, ban, subscription, setEdit, edit, setLoader, email }: {
    gymName?: string
    userId: string
    setUsers: React.Dispatch<React.SetStateAction<UsersComponent>>
    admin: boolean
    ban: string | null | boolean
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
    const [createBan, setCreateBan] = useState<boolean>(false)
    const [editBan, setEditBan] = useState(false)

    useEffect(() => { setInputs(prev => { return { ...prev, ban: ban } }) }, [])

    return (
        <>
            <Modal open>
                <div className='w-screen h-screen flex justify-center items-center text-center flex-col ll:p-2'>
                    <menu
                        className='
                            relative
                            flex
                            flex-col 
                            p-4 
                            w-1/4 
                            rounded
                            ll:w-full
                            bg-gradient-to-t
                            from-gray-300
                            via-gray-500
                            to-gray-300 
                            dark:from-gray-800 
                            dark:via-cyan-900 
                            dark:to-gray-800 
                        '>
                        <form className='flex flex-col' onSubmit={(e) => submitChanges({ e, inputs, userId, gymName, setUsers, setLoader, setEdit, email })}>
                            <label className='w-fit felx text-start font-bold'>
                                Admin:
                                <Switch name='admin' color='success' onChange={(e) => change({ e, setInputs })} defaultChecked={admin ? true : false} />
                            </label>
                            <label className='w-fit text-start font-bold'>
                                Suscripción:
                                <Switch name='pay' color='success' onChange={(e) => change({ e, setInputs })} defaultChecked={subscription ? true : false} />
                            </label>
                            <div className='flex'>
                                <label className='text-start font-bold flex items-center'>
                                    Ban:
                                    <Switch
                                        name='banMotive'
                                        color='success'
                                        checked={inputs?.ban ? true : false}
                                        onChange={() => {
                                            if (inputs?.ban) {
                                                setInputs(prev => { return { ...prev, ban: null } })
                                            } else
                                                setCreateBan(prev => !prev)
                                        }
                                        }
                                        defaultChecked={ban ? true : false}
                                    />
                                </label>
                                {inputs?.ban &&
                                    <div className='flex items-center'>
                                        <p className='max-w-38 break-all mr-2 font-bold'>{inputs?.ban || ban}</p>
                                        <button type='button' onClick={() => {
                                            setCreateBan(prev => !prev)
                                            setEditBan(prev => !prev)
                                        }}
                                            className='h-6 flex items-center justify-center bg-gray-900 border-solid border-gray-900 hover:border-solid hover:border-cyan-500 hover:bg-cyan-900'
                                        >Editar ban</button>
                                    </div>}
                            </div>
                            <div className='w-full flex justify-between mt-2 mb-2'>
                                <button className={`${edit.warmUps == 0 ?
                                    'opacity-50 pointer-events-none bg-transparent dark:bg-gray-900'
                                    :
                                    'pointer-events-auto hover:bg-gray-700 dark:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-black'
                                    }
                                    border-solid border-2 border-white 
                                dark:hover:border-transparent 
                                flex items-center justify-center h-8`
                                }
                                    onClick={() => {
                                        getWarmUpsUser({ id: userId, setRoutinesUser })
                                        setModal((prev) => {
                                            if (prev != '') return ''
                                            else return warmUp
                                        })
                                        setRoutineAdmin(undefined)
                                    }}>
                                    <VisibilityIcon className='mr-2'></VisibilityIcon>
                                    Calentamientos
                                </button>
                                <button className={`${edit.routines == 0 ?
                                    'opacity-50 pointer-events-none bg-transparent dark:bg-gray-900'
                                    :
                                    'pointer-events-auto hover:bg-gray-700 dark:bg-gray-900 dark:hover:bg-gray-200 dark:hover:text-black'
                                    }
                                border-solid border-2 border-white 
                                dark:hover:border-transparent
                                w-28 flex items-center justify-center h-8`
                                }
                                    onClick={() => {
                                        getRoutinesUser({ id: userId, setRoutinesUser })
                                        setModal((prev) => {
                                            if (prev != '') return ''
                                            else return routine
                                        })
                                        setRoutineAdmin(undefined)
                                    }}>
                                    <VisibilityIcon className='mr-2'></VisibilityIcon>
                                    Rutinas
                                </button>
                            </div>
                            <div className='w-full flex justify-between'>
                                <button
                                    className='
                                    w-40 
                                    border-solid
                                    border-2 
                                    hover:bg-gray-700
                                    hover:border-none
                                    dark:border-white
                                    dark:bg-gray-900 
                                    dark:hover:bg-gray-200
                                    dark:hover:border-transparent 
                                    dark:hover:text-black 
                                    flex 
                                    items-center 
                                    justify-center 
                                    h-8
                                '
                                    onClick={() => setCreateWarm(prev => !prev)}>
                                    <AddIcon className='mr-2'></AddIcon>
                                    Calentamiento
                                </button>
                                <button
                                    className='
                                w-28
                                border-solid
                                border-2 
                                hover:bg-gray-700
                                hover:border-none
                                dark:border-white
                                dark:bg-gray-900 
                                dark:hover:bg-gray-200 
                                dark:hover:border-transparent 
                                dark:hover:text-black 
                                flex items-center justify-center h-8'
                                    onClick={() => setCreateRoutine(prev => !prev)}>
                                    <AddIcon className='mr-2'></AddIcon>
                                    Rutina
                                </button>
                            </div>
                            {/* <button className='absolute rounded-full top-4 right-4 bg-gray-900' onClick={() => setEdit({ state: false })}>❌</button> */}
                            <div className='flex flex-col mt-2'>
                                <button className='
                                confirm 
                                h-8'
                                >
                                    Guardar cambios
                                </button>
                                <button className='
                                    cancel 
                                    h-8
                                    mt-2'
                                    type='button'
                                    onClick={() => setEdit({ state: false })}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </menu>
                </div>
            </Modal >
            {
                createBan &&
                < Modal open className='w-100 h-screen flex justify-center items-center text-center flex-col ll:p-2'>
                    <div className='
                        relative flex flex-col justify-between p-4 
                        bg-gradient-to-t
                        from-gray-300
                        via-gray-500
                        to-gray-300 
                        dark:from-gray-800 
                        dark:via-cyan-900 
                        dark:to-gray-800 
                        w-80 h-32 rounded ll:w-full
                        ll:w-80
                    '>
                        <input
                            className="
                                w-fit 
                                p-1 
                                font-bold 
                                bg-transparent 
                                border-b-4 
                                border-black 
                                placeholder:font-bold 
                                focus:outline-0 
                                focus:border-gray-300
                                placeholder:text-black
                                dark:focus:border-cyan-600 
                                dark:placeholder:text-gray-300 
                            "
                            name='ban'
                            placeholder='Motivo del ban'
                            maxLength={20}
                            autoFocus
                            onChange={(e) => change({ e, setInputs })}
                            defaultValue={typeof inputs?.ban == 'string' ? inputs?.ban : ''}
                        />
                        <div className='flex justify-between w-56 h-8'>
                            <button
                                className={`${!inputs?.ban ?
                                    'opacity-50 pointer-events-none' : 'pointer-events-auto'
                                    }
                            confirm`
                                }
                                onClick={() => {
                                    setCreateBan(false)
                                    if (editBan) setEditBan(false)
                                }}>Guardar</button>
                            <button
                                className='cancel'
                                onClick={() => {
                                    setCreateBan(false)
                                    if (!editBan) setInputs(prev => { return { ...prev, ban: null } })
                                    else setEditBan(false)
                                }}>Cancelar</button>
                        </div>
                    </div>
                </Modal >
            }
            {
                modal != '' ?
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
            {
                saw ?
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
            {
                addDay ?
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
            {
                createRoutine ?
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
            {
                createWarm ?
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