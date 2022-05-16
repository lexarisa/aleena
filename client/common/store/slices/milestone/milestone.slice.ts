import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';

export const MilestoneSlice = createSlice({
    name: 'milestone',

    initialState: {
        allMilestones: [] as any,
        currentMilestone: 0,
    },
    
    reducers: {

        setMilestones: (state, action: PayloadAction<any>) => {
            state.allMilestones = action.payload;
        },

        updateMilestone: (state, action: PayloadAction<any>) => {
            const oldMilestones = state.allMilestones.filter((milestone: any) => {
                milestone.id !== action.payload.id
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
            state.currentMilestone = action.payload;
        },
    },
    extraReducers: {
    }
})

export const { setMilestones, updateMilestone, createMilestone, deleteMilestone, setCurrentMilestone } = MilestoneSlice.actions;

export const selectMilestone = (state: AppState) => state.milestone;

export default MilestoneSlice.reducer;