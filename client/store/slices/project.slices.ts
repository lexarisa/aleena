import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../index.store';


export const fetchProjects = createAsyncThunk
('projects/fetchProjects', async (project_id) => {

    const res = await fetch(`${process.env.BASEURL}/project/${project_id}`)
    .then((data) => data.json())

    return res.projects;
});

export const ProjectSlice = createSlice({
    name: 'project',

    initialState: [],
    
    reducers: {

        getProject: (state, action ) => {},

        setProject: (state, action) => {
            state  = action.payload
        } ,

        updateProjectData: (state, action) => {

        }
    },
    extraReducers: {
        // @ts-ignore
        [fetchProjects.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

export const { setProject } = ProjectSlice.actions;

export const selectProject = (state: AppState) => state.project

export default ProjectSlice.reducer;