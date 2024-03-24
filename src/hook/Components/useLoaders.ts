import { useState } from "react";

export default function useLoaders() {
    const [loader, setLoader] = useState<{ state: boolean, reason?: string }>({ state: false })

    return { loader, setLoader }
}