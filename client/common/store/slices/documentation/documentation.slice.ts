import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IDocumentation from '../../../types/IDocumentation';
import { RootState } from '../../index.store';

export const DocumentationSlice = createSlice({
  name: 'documentation',

  initialState: {
    projectDocuments: [] as any,
    documents: [] as any,
  },

  reducers: {
    setDocuments: (state, action: PayloadAction<any>) => {
      state.documents = action.payload;
      // state.projectDocuments = action.payload;
    },
    setProjectDocuments: (state, action: PayloadAction<any>) => {
      state.projectDocuments = action.payload;
    },

    updateDocument: (state, action: PayloadAction<any>) => {
      //for milestone
      const oldDocuments = state.documents.filter((document: any) => {
        document.id !== action.payload.id;
      });
      state.documents = [...oldDocuments, action.payload];
      //for project
      const oldProjectDocuments = state.projectDocuments.filter(
        (document: any) => {
          document.id !== action.payload.id;
        }
      );
      state.projectDocuments = [...oldProjectDocuments, action.payload];
    },
    updateArticleDocument: (state, action: PayloadAction<any>) => {
      //for milestone
      const newDocs = state.documents.map((document: IDocumentation) => {
        if (document.id === action.payload.id) {
          return action.payload;
        } else {
          return document;
        }
      });
      state.documents = [...newDocs];
      //for project
      const newProjectDocs = state.projectDocuments.map(
        (document: IDocumentation) => {
          if (document.id === action.payload.id) {
            return action.payload;
          } else {
            return document;
          }
        }
      );
      state.projectDocuments = [...newProjectDocs];
    },

    createDocument: (state, action) => {
      //for milestone
      const docs = state.documents.filter((doc: IDocumentation) => {
        return doc.id !== action.payload.id;
      });
      state.documents = [...docs, action.payload];
      //for project
      const projectDocs = state.projectDocuments.filter(
        (doc: IDocumentation) => {
          return doc.id !== action.payload.id;
        }
      );
      state.projectDocuments = [...projectDocs, action.payload];
    },

    deleteDocument: (state, action) => {
      //for milestone
      state.documents = state.documents.filter(
        (document: any) => document.id !== action.payload.id
      );
      //for project
      state.projectDocuments = state.projectDocuments.filter(
        (document: any) => document.id !== action.payload.id
      );
    },
  },
  extraReducers: {},
});

export const {
  setDocuments,
  setProjectDocuments,
  updateDocument,
  createDocument,
  deleteDocument,
  updateArticleDocument,
} = DocumentationSlice.actions;

export const selectDocumentation = (state: RootState) => state.documentation;

export default DocumentationSlice.reducer;
