import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const MilestoneSlice = createSlice({
    name: 'milestone',

    initialState: {
        allMilestones: [] as any,
        currentMilestone: null,
    },
    
    reducers: {

        setMilestones: (state, action: PayloadAction<any>) => {
            state.allMilestones = action.payload;
        },

        updateMilestones: (state, action: PayloadAction<any>) => {
            const oldMilestones = state.allMilestones.filter((milestone: any) => {
                return milestone.id !== action.payload.id
            });
            state.allMilestones = [...oldMilestones, action.payload];
        },

        createMilestone: (state, action) => {
            state.allMilestones = [...state.allMilestones, action.payload]
        },

        deleteMilestone: (state, action) => {
            state.allMilestones = state.allMilestones.filter((milestone: any) => milestone.id !== action.payload.id)
        },

        setCurrentMilestone: (state, action) => {
            console.log('sliceee', action.payload)
            state.currentMilestone = action.payload;
        },
    },
    extraReducers: {
    }
})

export const { setMilestones, updateMilestones, createMilestone, deleteMilestone, setCurrentMilestone } = MilestoneSlice.actions;

export const selectMilestone = (state: RootState) => state.milestone;

export default MilestoneSlice.reducer;