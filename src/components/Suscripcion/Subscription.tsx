/* eslint-disable react-hooks/exhaustive-deps */
import SubscriptionAdmin from "../Admin/Subscription/SubscriptionAdmin"
import useSubscription from "../../hook/Components/Subscription/useSubscription";
import TableSubscription from "./TableSubscription";
import Loader from "../Loader";
import { loaders } from "../../const";

export default function Subscription() {
    const { Payments, admin, amount, id, linkMp, updatePaymentsUser, create, loading, remove, setRemove } = useSubscription()

    return (
        admin ?
            <SubscriptionAdmin />
            :
            <>
                <p>Monto a pagar: {amount}</p>
                <button style={{ background: '#009ee3', color: 'white' }} >
                    <a href={linkMp}>
                        Pagar
                    </a>
                </button>
                {Payments && Payments.length > 0 ?
                    <>
                        <TableSubscription Payments={Payments} id={id} updatePaymentsUser={updatePaymentsUser} setRemove={setRemove} />
                    </>
                    :
                    <></>
                }
                {loading ?
                    <Loader text={loaders.payments} />
                    :
                    create ? <Loader text={loaders.createPayment} />
                        :
                        remove ? <Loader text={loaders.removePayment} />
                            :
                            <></>
                }
            </>
    )
}