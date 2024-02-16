import axios from "axios";
import { modifiedExerciseProps, modifiedLoadsProps } from "../../typeServices";

export function modifiedExercise({ id, inputs }: modifiedExerciseProps) {

}

export async function modifiedLoads({ exerciseId, id, load, routineId, routineActual, setOpenLoad }: modifiedLoadsProps) {
    try {
        if (id) {
            const response = await axios.put('/cargas', {
                id,
                newLoads: load
            })
            if (response.status == 200) window.alert('Carga modificada correctamente')
        }
        else {
            await axios.post('/cargas', {
                exerciseId,
                weight: load
            })
            axios.get(`/rutina/${routineId}`)
                .then(response => {
                    setOpenLoad(openLoad => !openLoad)
                    routineActual(response.data)
                })
        }
    } catch (error) {
        console.log(error)
        window.alert(error)
    }
}