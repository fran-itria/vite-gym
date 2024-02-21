import style from './Loader.module.css'

export default function Loader({ text }: { text: string }) {

    return (
        <div className={style.container}>
            <div className={style.loader}>
                <p className={style.text}>{text}</p>
                <div className={style.demo}>
                </div>
            </div>
        </div>
    )
}