import { Modal } from "@mui/material";
import CreateExercise from "./CraeteExercise/CreateExercise";
import useCreaetExercise from "../../hook/Components/Routine/useCreateExercise";
import TableComponent from "./TableRoutine";
import { addWeek } from "../../services/routine/modifiedWeeks";
import { Exercise, SetLoader } from "../../types";
import { useState } from 'react';
import ConfirmDeleteDay from "./ConfirmDeleteDay";
import { Routine } from "../../store/routine/slice";

interface DetailComponenProps {
    day: {
        id: string;
        WarmUp?: string | undefined;
        Exercises: [] | Exercise[];
    }
    i: number
    setLoader: SetLoader
    setRoutineAdmin: boolean
    routine: {
        weeks: number
        routineActual: (Days: Routine) => void
        routineId: string
    }
}

export default function Detail({ day, i, setLoader, setRoutineAdmin, routine }: DetailComponenProps) {
    const { addExercise, setAddExercise } = useCreaetExercise()
    const { weeks, routineActual, routineId } = routine
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
                    setSelectDay={setSelectDay}
                    setAddExercise={setAddExercise}
                    addWeek={addWeek}
                    setDeleteDay={setDeleteDay}
                    setRoutineAdmin={setRoutineAdmin}
                    routineActual={routineActual}
                    routineId={routineId}
                    weeks={weeks}
                />
            </Modal>
            {addExercise || deleteDay &&
                addExercise ?
                <Modal open={addExercise} className='flex flex-col w-full h-full items-center justify-center'>
                    <CreateExercise
                        day={day}
                        setAddExercise={setAddExercise}
                        routineId={routineId}
                        routineActual={routineActual}
                        setLoader={setLoader}
                        setRoutineAdmin={setRoutineAdmin}
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