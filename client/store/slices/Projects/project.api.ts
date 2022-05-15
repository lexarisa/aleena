import { createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../index.store';


export const fetchProjects = createAsyncThunk
('projects/fetchProjects', async (project_id) => {

    const res = await fetch(`${process.env.BASEURL}/project/${project_id}`)
    .then((data) => data.json())
    console.log('thunk here',res)
    return res.projects;
});

