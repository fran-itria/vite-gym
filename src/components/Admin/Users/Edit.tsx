import Switch from '@mui/material/Switch';
import CreateRoutine from '../../Routine/CreateRoutine';
import { CaseResolve, SetLoader, UsersComponent } from '../../../types';
import submitChanges from '../../../services/editForm/submitChanges';
import useEdit from '../../../hook/Components/Users/Edit/useEdit';
import useDayCreate from '../../../hook/Components/Routine/useCreateDay';
import FormTotalExercise from '../../Routine/FormTotalExercise';
import FormOneDay from '../../Routine/CraeteOneDay/FormOneDay';
import TableConfirmDay from '../../Routine/CraeteOneDay/TableConfirmDay';
import { change, getRoutinesUser, getWarmUpsUser } from './functions';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import WarmUp from '../../WarmUp/WarmUp';
import Routine from '../../Routine/Routine';

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
        routinesUser,
        setRoutinesUser,
    } = useEdit()
    const { addDay, dayCreate, pag, setAddDay, setDayCreate, setPag, setTotalExercise, totalExercise } = useDayCreate()
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
                            background 
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
                                            className='button h-6 flex items-center justify-center'
                                        >Editar ban</button>
                                    </div>}
                            </div>
                            <div className='w-full flex justify-between mt-2 mb-2'>
                                <button
                                    className={`${edit.warmUps == 0 ? 'opacity-50 pointer-events-none' : 'pointer-events-auto'} 
                                        button flex items-center justify-center h-8`
                                    }
                                    onClick={() => {
                                        getWarmUpsUser({ id: userId, setRoutinesUser })
                                        setModal((prev) => {
                                            if (prev != undefined) return undefined
                                            else return CaseResolve.calentamiento
                                        })
                                        setRoutineAdmin(undefined)
                                    }}
                                    type='button'
                                >
                                    <VisibilityIcon className='mr-2'></VisibilityIcon>
                                    Calentamientos
                                </button>
                                <button
                                    className={`${edit.routines == 0 ? 'opacity-50 pointer-events-none' : 'pointer-events-auto'}
                                        button w-28 flex items-center justify-center h-8`
                                    }
                                    onClick={() => {
                                        getRoutinesUser({ id: userId, setRoutinesUser })
                                        setModal((prev) => {
                                            if (prev != undefined) return undefined
                                            else return CaseResolve.rutina
                                        })
                                        setRoutineAdmin(undefined)
                                    }}
                                    type='button'>
                                    <VisibilityIcon className='mr-2'></VisibilityIcon>
                                    Rutinas
                                </button>
                            </div>
                            <div className='w-full flex justify-between'>
                                <button
                                    className='button w-40 flex items-center justify-center h-8'
                                    onClick={() => setCreateWarm(prev => !prev)}
                                    type='button'
                                >
                                    <AddIcon className='mr-2'></AddIcon>
                                    Calentamiento
                                </button>
                                <button
                                    className='button w-28 flex items-center justify-center h-8'
                                    onClick={() => setCreateRoutine(prev => !prev)}
                                    type='button'
                                >
                                    <AddIcon className='mr-2'></AddIcon>
                                    Rutina
                                </button>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <button className='buttonConfirm hover:border-solid h-8'
                                >
                                    Guardar cambios
                                </button>
                                <button className='buttonCancel h-8 mt-2'
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
                < Modal open className='w-100 h-screen flex justify-center items-center text-center flex-col'>
                    <div className='
                        flex 
                        flex-col 
                        justify-between 
                        p-4 
                        w-80 
                        h-28 
                        rounded 
                        background
                    '>
                        <input
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
                            buttonConfirm w-20`
                                }
                                onClick={() => {
                                    setCreateBan(false)
                                    if (editBan) setEditBan(false)
                                }}>Guardar</button>
                            <button
                                className='buttonCancel w-20'
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
                modal != undefined && (routinesUser?.length && routinesUser?.length > 0) && (modal == CaseResolve.calentamiento || modal == CaseResolve.rutina) &&
                <Modal open>
                    <div className='w-screen h-screen flex justify-center items-center text-center flex-col ll:p-2'>
                        {modal == CaseResolve.calentamiento ?
                            <WarmUp
                                otherUserId={userId}
                                isWarmUpOrRoutine={CaseResolve.calentamiento}
                                setUsers={setUsers}
                                setModal={setModal}>
                            </WarmUp>
                            :
                            <Routine
                                otherUserId={userId}
                                isWarmUpOrRoutine={CaseResolve.rutina}
                                setUsers={setUsers}
                                setModal={setModal}
                            ></Routine>
                        }
                    </div>
                </Modal>
            }
            {
                addDay ?
                    <FormTotalExercise setPag={setPag} setTotalExercise={setTotalExercise} setAddDay={setAddDay} routine={routineAdmin} />
                    :
                    pag != 0 ?
                        pag < Number(totalExercise) + 1 ?
                            <FormOneDay actualExercise={pag} setDayCreate={setDayCreate} setPag={setPag} setAddDay={setAddDay} pag={pag} />
                            :
                            <TableConfirmDay
                                key={pag}
                                dayCreate={dayCreate}
                                setAddDay={setAddDay}
                                setDayCreate={setDayCreate}
                                setPag={setPag}
                                setTotalExercise={setTotalExercise}
                                routine={routineAdmin}
                                setLoader={setLoader}
                                setRoutineAdmin={setRoutineAdmin}
                            />
                        :
                        <></>
            }
            {
                (createRoutine || createWarm) &&
                <CreateRoutine
                    updateRoutinesUser={createRoutine ? updateRoutinesUser : undefined}
                    updateWarmUpUser={createWarm ? updateWarmUpUser : undefined}
                    updateIdGlobal={updateIdGlobal}
                    userId={userId}
                    setOpenCreateRouitine={createRoutine ? setCreateRoutine : setCreateWarm}
                    gymName={gymName}
                    setUsers={setUsers}
                    id={id ? id : undefined}
                    createWarm={createWarm}
                    setLoader={setLoader}
                    setEdit={setEdit}
                />
            }
        </>
    )
}