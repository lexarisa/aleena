import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const ProjectSlice = createSlice({
    name: 'project',

    initialState: {
        allProjects: [] as any,
        currentProject: null,
    },
    
    reducers: {

        setProjects: (state, action: PayloadAction<any>) => {
            state.allProjects = action.payload;
        },

        updateProjects: (state, action: PayloadAction<any>) => {
            const oldProjects = state.allProjects.filter((project: any) => {
                return project.id !== action.payload.id
            });
            state.allProjects = [...oldProjects, action.payload];
        },

        createProject: (state, action) => {
            state.allProjects = [...state.allProjects, action.payload]
        },

        deleteProject: (state, action) => {
            state.allProjects = state.allProjects.filter((project: any) => project.id !== action.payload.id)
        },

        setCurrentProject: (state, action) => {
            state.currentProject = action.payload
        }
    },
    extraReducers: {
    }
})

export const { setProjects, updateProjects, createProject, deleteProject, setCurrentProject  } = ProjectSlice.actions;

export const selectProject = (state: RootState) => state.project;

export default ProjectSlice.reducer;