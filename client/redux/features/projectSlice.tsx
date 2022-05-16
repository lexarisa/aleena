import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import {
  selectProject,
  createProject,
  deleteProject,
  updateProjectDetail,
} from '../../pages/api/projectApi';
import IProject from '../../common/types/IProject';

const createMockProject = (title) => ({
  // id: nanoid(),
  // title,
  // status: 'To Do',
  // description: '',
  // created_at: Date.now(),
  // assignedTo: [],
  project: [],
  loading: false,
  error: '',
});
// const initialState = [createMockProject('Alena')];
export const getProjectApi = createAsyncThunk(
  'project/getProject',
  async (id: number) => {
    return selectProject(id);
  }
);
export const createProjectApi = createAsyncThunk(
  'project/createProject',
  async (data: IProject) => {
    console.log('data to post', data);
    return fetch('http://localhost:3001/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
);

export const deleteProjectApi = createAsyncThunk(
  'project/deleteProject',
  async (id: number) => {
    return deleteProject(id);
  }
);

export const updateProjectApi = createAsyncThunk(
  'project/updateProject',
  async (id: number, projectData: IProject) => {
    return updateProjectDetail(id, projectData);
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState: { project: [], loading: false, error: null },
  reducers: {
    setProjects(state, action) {
      state.project = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectApi.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(createProjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProjectApi.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(deleteProjectApi.fulfilled, (state, action) => {
        state.project = action.payload;
      });
  },
});

export default projectSlice.reducer;
export const { setProjects } = projectSlice.actions;
