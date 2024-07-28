import { useState } from "react";

export default function useLoaders() {
    const [loader, setLoader] = useState<string>()

    return { loader, setLoader }
}