import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const DocumentationSlice = createSlice({
    name: 'documentation',

    initialState: {
        documents: [] as any,
    },
    
    reducers: {

        setDocuments: (state, action: PayloadAction<any>) => {
            state.documents = action.payload;
        },

        updateDocuments: (state, action: PayloadAction<any>) => {
            const oldDocuments = state.documents.filter((document: any) => {
                return document.id !== action.payload.id
            });
            state.documents = [...oldDocuments, action.payload];
        },

        createDocument: (state, action) => {
            state.documents = [...state.documents, action.payload]
        },

        deleteDocument: (state, action) => {
            state.documents = state.documents.filter((document: any) => document.id !== action.payload.id)
        },
    },
    extraReducers: {
    }
})

export const { setDocuments, updateDocuments, createDocument, deleteDocument} = DocumentationSlice.actions;

export const selectDocumentation = (state: RootState) => state.documentation;

export default DocumentationSlice.reducer;