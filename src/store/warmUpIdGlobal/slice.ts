import { createSlice } from "@reduxjs/toolkit"


const initialState: string = ''

export const warmUpIdGlobal = createSlice({
    name: 'warmUpIdGlobal',
    initialState,
    reducers: {
        updateId: (_state, action) => {
            return action.payload !== undefined ? action.payload : '';
        }
    }
})

export default warmUpIdGlobal.reducer

export const { updateId } = warmUpIdGlobal.actions