import { useState } from "react";

export default function useLoaders() {
    const [create, setCreate] = useState<boolean>(false)
    const [remove, setRemove] = useState<boolean>(false)
    const [save, setSave] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    return { create, setCreate, remove, setRemove, save, setSave, loading, setLoading }
}