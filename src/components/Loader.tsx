import { Modal } from "@mui/material";

export default function Loader({ text }: { text: string }) {
    return (
        <Modal open={Boolean(text)}>
            <div className='w-screen h-screen flex justify-center items-center text-center'>
                <p className='animate-bounce text-white text-4xl rounded-lg border p-2 bg-gray-700 dark:bg-cyan-950'>{text}...</p>
            </div>
        </Modal>
    )
}