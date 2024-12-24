
import { useState } from "react"
import { FormTotalExerciseComponentProps } from "../../types"

export default function FormTotalExercise({ setPag, setTotalExercise, setAddDay, pagDays, routine, setPagDays, setTotalDays, setOpenCreateRouitine }: FormTotalExerciseComponentProps) {
    const [exercise, setExercise] = useState('')
    return (
        <div className={`flex flex-col ${!setOpenCreateRouitine && 'background p-4 rounded'}`}>
            <b className="
                italic 
                underline 
                underline-offset-4 
                decoration-2 
                decoration-red-700
                mb-4
                text-black
                dark:text-gray-300"
            >
                Día número {pagDays ? pagDays : routine?.Days?.length ? routine?.Days?.length + 1 : <></>}
            </b>
            <input
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
            <div className="flex justify-between mt-5">
                {setTotalDays &&
                    <button onClick={() => {
                        setAddDay(addDay => !addDay)
                        if (setPagDays && setTotalDays) {
                            setPagDays(0)
                            setTotalDays('')
                        }
                    }}
                        className="buttonBack">
                        Volver
                    </button>
                }
                <button onClick={() => {
                    setAddDay(addDay => !addDay)
                    if (setOpenCreateRouitine) {
                        setOpenCreateRouitine(false)
                    }
                }}
                    className="buttonCancel w-24">
                    Cancelar
                </button>
                <button onClick={() => {
                    setPag(prev => prev + 1)
                    setAddDay(addDay => !addDay)
                }}
                    className={`${(exercise == '' || exercise == '0') && 'opacity-50 pointer-events-none'} buttonConfirm w-24`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}