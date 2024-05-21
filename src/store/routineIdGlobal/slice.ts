import { createSlice } from "@reduxjs/toolkit"


const initialState: { id: string } = {
    id: ''
}

export const routineIdSlice = createSlice({
    name: 'routineIdGlobal',
    initialState,
    reducers: {
        updateId: (_state, action) => {
            return {
                id: action.payload
            }
        }
    }
})

export default routineIdSlice.reducer

export const { updateId } = routineIdSlice.actions