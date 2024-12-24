import { Modal } from "@mui/material";
import CreateExercise from "./CraeteExercise/CreateExercise";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import TableComponent from "./Table";
import { addWeek } from "../../services/routine/modifiedWeeks";
import { DetailComponenProps } from "../../types";
import { useState } from 'react';
import ConfirmDeleteDay from "./ConfirmDeleteDay";


export default function Detail({ day, i, routineOrWarmUp, setLoader, setRoutineAdmin, isWarmUpOrRoutine, caseResolve }: DetailComponenProps) {
    const { addExercise, setAddExercise } = useCreaetExercise()
    const { weeks, routineActual, routineId } = routineOrWarmUp
    const [selectDay, setSelectDay] = useState<number | undefined>(undefined)
    const [deleteDay, setDeleteDay] = useState<boolean>(false)
    return (
        <div className='flex flex-col w-full items-center'>
            <button
                key={day.id}
                className='button h-6 w-16 flex justify-center items-center'
                onClick={() => setSelectDay(i + 1)}
            >
                Día {i + 1}
            </button >
            <Modal open={Boolean(selectDay)} className='flex flex-col items-center justify-center'>
                <TableComponent
                    day={day}
                    routineOrWarmUp={{ routineActual, routineId, weeks }}
                    setLoader={setLoader}
                    setRoutineAdmin={isWarmUpOrRoutine}
                    caseResolve={caseResolve}
                    setSelectDay={setSelectDay}
                    setAddExercise={setAddExercise}
                    addWeek={addWeek}
                    setDeleteDay={setDeleteDay}
                />
            </Modal>
            {addExercise || deleteDay &&
                addExercise ?
                <Modal open={addExercise} className='flex flex-col w-full h-full items-center justify-center'>
                    <CreateExercise
                        day={day}
                        setAddExercise={setAddExercise}
                        routineId={routineId ? routineId : undefined}
                        routineActual={routineActual ? routineActual : undefined}
                        setLoader={setLoader}
                        setRoutineAdmin={setRoutineAdmin}
                        caseResolve={caseResolve}
                    />
                </Modal>
                :
                deleteDay &&
                <Modal open={deleteDay} className='flex flex-col w-full h-full items-center justify-center'>
                    <ConfirmDeleteDay
                        key={day.id}
                        setLoader={setLoader}
                        setDeleteDay={setDeleteDay}
                        selectDay={selectDay}
                        caseResolve={caseResolve}
                        id={day.id}
                        routineActual={routineActual}
                        routineId={routineId}
                        setRoutineAdmin={setRoutineAdmin}
                    />
                </Modal>
            }
        </div>
    )
}