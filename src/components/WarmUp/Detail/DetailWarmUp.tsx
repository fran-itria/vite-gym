import { Modal } from "@mui/material";
import useCreaetExercise from "../../../hook/Components/Routine/useCreateExercise";
import { useState } from 'react';
import CreateExercise from "../../Routine/CraeteExercise/CreateExercise";
import ConfirmDeleteDay from "../../Routine/ConfirmDeleteDay";
import { Exercise, SetLoader } from "../../../types";
import { WarmUp } from "../../../store/warmUp/slice";
import TableWarmUp from "../Table/TableWarmUp";

interface DetailComponenProps {
    day: {
        id: string;
        WarmUp?: string | undefined;
        Exercises: [] | Exercise[];
    }
    i: number
    warmUp: {
        warmUpId: string
        warmUpActual: (Days: WarmUp) => void
    }
    setLoader: SetLoader
    setWarmUpAdmin: boolean
}

export default function DetailWarmUp({ day, i, warmUp, setLoader, setWarmUpAdmin }: DetailComponenProps) {
    const { addExercise, setAddExercise } = useCreaetExercise()
    const { warmUpActual, warmUpId } = warmUp
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
                <TableWarmUp
                    warmUpId={warmUpId}
                    day={day}
                    setDeleteDay={setDeleteDay}
                    setSelectDay={setSelectDay}
                    setAddExercise={setAddExercise}
                    setLoader={setLoader}
                    warmUpActual={warmUpActual}
                    setWarmUpAdmin={setWarmUpAdmin}
                />
            </Modal>
            {addExercise || deleteDay &&
                addExercise ?
                <Modal open={addExercise} className='flex flex-col w-full h-full items-center justify-center'>
                    <CreateExercise
                        day={day}
                        setAddExercise={setAddExercise}
                        setLoader={setLoader}
                        setRoutineAdmin={setWarmUpAdmin}
                        warmUpActual={warmUpActual}
                        warmUpId={warmUpId}
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
                        setRoutineAdmin={setWarmUpAdmin}
                        warmUpActual={warmUpActual}
                        warmUpId={warmUpId}
                    />
                </Modal>
            }
        </div>
    )
}