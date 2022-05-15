import { createSlice } from '@reduxjs/toolkit';

// const res = await fetch(`http://localhost:3001/milestone/${id}`);
// await fetch(`${process.env.BASEURL}/milestone/dash/${id}`);


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