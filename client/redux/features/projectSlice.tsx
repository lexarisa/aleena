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
    return createProject(data);
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
  initialState: { projects: [], loading: false, error: null },
  reducers: {
    setProjects(state, action) {
      console.log('urzeeee');
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectApi.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(createProjectApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProjectApi.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(deleteProjectApi.fulfilled, (state, action) => {
        state.projects = action.payload;
      });
  },
});

export default projectSlice.reducer;
export const { setProjects } = projectSlice.actions;
