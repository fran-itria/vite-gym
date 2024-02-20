import { useState } from "react";

export default function useLoaders() {

    const [pending, setPending] = useState<boolean>(false)

    return { pending, setPending }
}