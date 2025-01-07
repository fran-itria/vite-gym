
import { useState } from "react"
import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay, pagDays, routine, setPagDays, setTotalDays, setOpenCreateRouitine }: FormTotalExerciseComponentProps) {
    const [exercise, setExercise] = useState('')
    return (
        <div className={`flex flex-col ${!setOpenCreateRouitine && 'background p-4 rounded'} w-80 flex flex-col items-center`}>
            <b className="
                italic 
                underline 
                underline-offset-4 
                decoration-2 
                decoration-red-700
                mb-3
                text-black
                dark:text-gray-300"
            >
                Día número {pagDays ? pagDays : routine?.Days?.length ? routine?.Days?.length + 1 : <></>}
            </b>
            <input
                className="w-44"
                name="exercises"
                onChange={(e) => {
                    setTotalExercise(e.target.value)
                    setExercise(e.target.value)
                }}
                placeholder="Ejercicios a realizar:"
                type="number"
                autoFocus
            >

            </input>
            <div className="flex justify-between mt-5 w-full">
                <button onClick={() => {
                    setAddDay(addDay => !addDay)
                    if (setOpenCreateRouitine) {
                        setOpenCreateRouitine(false)
                    }
                }}
                    className="buttonCancel w-20">
                    Cancelar
                </button>
                {setTotalDays &&
                    <button onClick={() => {
                        setAddDay(addDay => !addDay)
                        if (setPagDays && setTotalDays) {
                            setPagDays(0)
                            setTotalDays('')
                        }
                    }}
                        className="buttonBack w-20">
                        Volver
                    </button>
                }
                <button onClick={() => {
                    setPag(prev => prev + 1)
                    setAddDay(addDay => !addDay)
                }}
                    className={`${(exercise == '' || exercise == '0') && 'opacity-50 pointer-events-none'} buttonConfirm w-20`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}