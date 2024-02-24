import { createSlice } from "@reduxjs/toolkit"


const initialState: { id?: string } = {
    id: undefined
}

export const warmUpId = createSlice({
    name: 'routineIdGlobal',
    initialState,
    reducers: {
        updateWarmUpId: (_state, action) => {
            return {
                id: action.payload
            }
        }
    }
})

export default warmUpId.reducer

export const { updateWarmUpId } = warmUpId.actions