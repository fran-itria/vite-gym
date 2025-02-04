import { createSlice } from "@reduxjs/toolkit"


const initialState: string | undefined = ''

export const routineIdSlice = createSlice({
    name: 'routineIdGlobal',
    initialState,
    reducers: {
        updateId: (_state, action) => {
            return action.payload !== undefined ? action.payload : '';
        }
    }
})

export default routineIdSlice.reducer

export const { updateId } = routineIdSlice.actions