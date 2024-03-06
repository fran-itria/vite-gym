/* eslint-disable react-hooks/exhaustive-deps */
import SubscriptionAdmin from "../Admin/Subscription/SubscriptionAdmin"
import useSubscription from "../../hook/Components/Subscription/useSubscription";
import TableSubscription from "./TableSubscription";

export default function Subscription() {
    const { Payments, admin, amount, id, linkMp, updatePaymentsUser } = useSubscription()

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
                        <TableSubscription Payments={Payments} id={id} updatePaymentsUser={updatePaymentsUser} />
                    </>
                    :
                    <></>
                }
            </>
    )
}