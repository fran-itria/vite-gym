import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Loader({ text }: { text: string }) {

    return (
        <div style={{ position: 'absolute', border: 'solid, blue, 5px' }}>
            <p>{text}</p>
            <MoreHorizIcon color='info' />
        </div>
    )
}