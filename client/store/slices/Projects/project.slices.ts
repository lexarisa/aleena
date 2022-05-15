import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';
import { fetchProjects } from './project.api';

export const ProjectSlice = createSlice({
    name: 'project',

    initialState: {
        allProjects: [] as any[],
        currentProject: null as any,
    },

    reducers: {

        setProjects: (state, action: PayloadAction<any[]>) => {
            state.allProjects  = action.payload
        },

        setCurrentProject: (state, action: PayloadAction<any>) => {
            state.currentProject  = action.payload
        },

        createProject: (state, action: PayloadAction<any[]>) => {
            state.allProjects  = [...state.allProjects, action.payload];
        },

        deleteProject: (state, action: PayloadAction<any>) => {
            state.allProjects.filter(
                (el: any) => 
                el.project.id !== action.payload.project.id)

            if (state.currentProject.id === action.payload.project.id) {
                state.currentProject = null;
            }
        },

        updateProject: (state, action: PayloadAction<any>) => {
            
        }
    },

    extraReducers: {
        // @ts-ignore
        [fetchProjects.fulfilled]: (state, action) => {
            return setProjects(action.payload) ;
        }
    }
})

export const { setProjects, createProject, deleteProject, updateProject } = ProjectSlice.actions;

export default ProjectSlice.reducer;