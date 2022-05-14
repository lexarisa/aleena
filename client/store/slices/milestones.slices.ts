import { createSlice } from '@reduxjs/toolkit';

export const MilestoneSlice = createSlice({
    name: 'milestone',

    initialState: {
        name: null,
    },

    reducers: {
        setMilestoneData: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { setMilestoneData } = MilestoneSlice.actions;

export default MilestoneSlice.reducer;