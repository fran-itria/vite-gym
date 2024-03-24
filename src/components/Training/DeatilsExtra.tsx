import { ThemeProvider } from "@mui/material";
import { DetailsExtraProps } from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "../../themeIcons/customTheme";
import { useAppSelector } from "../../hook/store";
import deleteTraining from "../../services/createTraining/deleteTraining";
import { useUserActions } from "../../hook/useUserActions";
import CreateIcon from '@mui/icons-material/Create';


export default function DetailsExtra({ extra, setLoader, setEdit, setTrainId, setDefaultValues }: DetailsExtraProps) {
    const { id } = useAppSelector(state => state.user)
    const { updateTrainingsUser } = useUserActions()
    return (
        <details>
            <summary>
                {`${extra.date.toString().split('-')[2]} - ${extra.date.toString().split('-')[1]}`}
            </summary>
            <p> Ejercicio realizado: {extra.exercise}</p>
            <p> Hora de realización: {`${extra.hour.split(':')[0]}:${extra.hour.split(':')[1]}hs`}</p>
            {extra.duration ? <p>Tiempo de actividad: {extra.duration}</p> : <></>}
            {extra.distance ? <p>Distancia recorrida: {extra.distance}km</p> : <></>}
            <ThemeProvider theme={theme}>
                <CreateIcon sx={{ color: theme.palette.pencil.main }} onClick={() => {
                    setEdit(prev => !prev)
                    setTrainId(extra.id)
                    setDefaultValues({
                        date: extra.date,
                        distance: extra.distance,
                        duration: extra.duration,
                        exercise: extra.exercise,
                        hour: extra.hour
                    })
                }} />
                <DeleteIcon
                    sx={{ color: theme.palette.tashIcon.main }}
                    onClick={() => deleteTraining({ id: extra.id, setLoader, updateTrainingsUser, userId: id })}
                />
            </ThemeProvider>
        </details>
    )
}