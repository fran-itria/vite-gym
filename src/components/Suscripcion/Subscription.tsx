/* eslint-disable react-hooks/exhaustive-deps */
import SubscriptionAdmin from "../Admin/Subscription/SubscriptionAdmin"
import useSubscription from "../../hook/Components/Subscription/useSubscription";
import TableSubscription from "./TableSubscription";
import Loader from "../Loader";
import Register from "../Register/Register";
import mercadoPagoLogo from "../../images/mercadoPago.png";

export default function Subscription() {
    const { Payments, admin, amount, linkMp, loader, setLoader } = useSubscription()

    return (
        <>
            {loader && <Loader text={loader} />}
            {admin ?
                <div className="p-4 h-full flex flex-col justify-between ll:p-0">
                    <SubscriptionAdmin setLoader={setLoader} />
                    <Register setLoader={setLoader} />
                </div>
                :
                <div className="p-10 h-full flex flex-col justify-start items-center">
                    <b className="text-xl text-black dark:text-white">Monto a pagar: {amount}</b>
                    <button className="
                            w-32 
                            flex 
                            justify-center 
                            items-center 
                            rounded 
                            bg-blue-500
                            mt-5
                            mb-5
                    ">
                        <a href={linkMp} className="w-24 text-xl flex justify-around items-center text-white">
                            <img src={mercadoPagoLogo} />
                            Pagar
                        </a>
                    </button>
                    {Payments && Payments.length > 0 &&
                        <>
                            <TableSubscription Payments={Payments} />
                        </>
                    }
                </div>}
        </>
    )
}