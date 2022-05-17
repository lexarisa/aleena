import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IDocumentation from '../../../types/IDocumentation';
import { RootState } from '../../index.store';

export const DocumentationSlice = createSlice({
  name: 'documentation',

  initialState: {
    documents: [] as any,
  },

  reducers: {
    setDocuments: (state, action: PayloadAction<any>) => {
      //   const articlePayload = action.payload.map((doc) => {
      //     doc.articles ? doc : { ...doc, articles: [] };
      //   });
      state.documents = action.payload;
    },

    updateDocument: (state, action: PayloadAction<any>) => {
      const oldDocuments = state.documents.filter((document: any) => {
        document.id !== action.payload.id;
      });
      state.documents = [...oldDocuments, action.payload];
    },
    updateArticleDocument: (state, action: PayloadAction<any>) => {
      const newDocs = state.documents.map((document: IDocumentation) => {
        if (document.id === action.payload.id) {
          return action.payload;
        } else {
          return document;
        }
      });
      state.documents = [...newDocs];
    },

    createDocument: (state, action) => {
      const docs = state.documents.filter((doc: IDocumentation) => {
        return doc.id !== action.payload.id;
      });
      state.documents = [...docs, action.payload]; //...state.documents,
    },

    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(
        (document: any) => document.id !== action.payload.id
      );
    },
  },
  extraReducers: {},
});

export const {
  setDocuments,
  updateDocument,
  createDocument,
  deleteDocument,
  updateArticleDocument,
} = DocumentationSlice.actions;

export const selectDocumentation = (state: RootState) => state.documentation;

export default DocumentationSlice.reducer;
