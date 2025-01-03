import { Modal } from "@mui/material";
import { useEffect, useState } from "react";

export default function ModifiedExercise({
    modifiedExercise,
    setModifiedExercise,
    dayCreate
}: {
    modifiedExercise: number;
    setModifiedExercise: React.Dispatch<React.SetStateAction<number | undefined>>;
    dayCreate: {
        exercise?: number | undefined;
        name?: string | undefined;
        series?: string | undefined;
        reps?: string | undefined;
        link?: string | undefined;
    }[]
}) {

    const [exercise, setExercise] = useState<{
        exercise?: number | undefined;
        name?: string | undefined;
        series?: string | undefined;
        reps?: string | undefined;
        link?: string | undefined;
    }>({})

    const [inputsExecise, setInputsExecise] = useState<{
        exercise: number;
        name: string;
        series: string;
        reps: string;
        link?: string;
    }>({
        exercise: modifiedExercise,
        name: exercise.name ? exercise.name : '',
        series: exercise.series ? exercise.series : '',
        reps: exercise.reps ? exercise.reps : '',
        link: exercise.link ? exercise.link : ''
    })

    const [index, setIndex] = useState<number>(0)

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsExecise({ ...inputsExecise, [e.target.name]: e.target.value })
    }

    const modified = () => {
        dayCreate.splice(index, 1, inputsExecise)
        setModifiedExercise(undefined)
    }

    useEffect(() => {
        dayCreate.find(exercise => {
            if (exercise.exercise === modifiedExercise) {
                setExercise(exercise)
                setInputsExecise({
                    exercise: modifiedExercise,
                    name: exercise.name ? exercise.name : '',
                    series: exercise.series ? exercise.series : '',
                    reps: exercise.reps ? exercise.reps : '',
                    link: exercise.link ? exercise.link : ''
                })
            }
        })
        setIndex(dayCreate.findIndex(exercise => exercise.exercise === modifiedExercise))
    }, [])

    return (
        <Modal open className=" w-screen h-screen flex justify-center items-center">
            <div className="p-3 w-1/4 rounded ll:w-96 background h-64 flex flex-col justify-around">
                <label className="flex items-center font-bold">Nombre del ejercicio:
                    <input
                        className="w-40 ml-2"
                        name="name"
                        onChange={(e) => change(e)}
                        defaultValue={exercise.name}
                    >
                    </input>
                </label>
                <label className="flex items-center font-bold">Series:
                    <input
                        className="w-40 ml-2"
                        name="series"
                        onChange={(e) => change(e)}
                        defaultValue={exercise.series}>
                    </input>
                </label>
                <label className="flex items-center font-bold">Repeticiones:
                    <input
                        className="w-40 ml-2"
                        name="reps"
                        onChange={(e) => change(e)}
                        defaultValue={exercise.reps}>
                    </input>
                </label>
                <label className="flex items-center font-bold">* Link de video:
                    <input
                        className="w-40 ml-2"
                        type='url'
                        name="link"
                        onChange={(e) => change(e)}
                        defaultValue={exercise.link}>
                    </input>
                </label>
                <b>( * opcional )</b>
                <div className="flex justify-around">
                    <button className="buttonConfirm w-24" onClick={() => modified()}>
                        Modificar
                    </button>
                    <button className="buttonCancel w-24" onClick={() => setModifiedExercise(undefined)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    )
}