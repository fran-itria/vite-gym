/* eslint-disable react-hooks/exhaustive-deps */
import SubscriptionAdmin from "../Admin/Subscription/SubscriptionAdmin"
import useSubscription from "../../hook/Components/Subscription/useSubscription";
import TableSubscription from "./TableSubscription";
import Loader from "../Loader";
import { Modal } from "@mui/material";

export default function Subscription() {
    const { Payments, admin, amount, id, linkMp, updatePaymentsUser, loader, setLoader } = useSubscription()

    return (
        <>
            <Modal open={Boolean(loader)}>
                <>
                    {loader && <Loader text={loader} />}
                </>
            </Modal>
            {admin ?
                <SubscriptionAdmin setLoader={setLoader} />
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
                            <TableSubscription Payments={Payments} id={id} updatePaymentsUser={updatePaymentsUser} setLoader={setLoader} />
                        </>
                        :
                        <></>
                    }
                </>}
        </>
    )
}