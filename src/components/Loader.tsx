import style from './Loader.module.css'

export default function Loader({ text }: { text: string }) {

    return (
        <div className='w-screen h-screen flex justify-center items-center text-center'>
            <div className={style.loader}>
                <p className={style.text}>{text}</p>
                <div className={style.demo}>
                </div>
            </div>
        </div>
    )
}