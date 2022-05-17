import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const ArticleSlice = createSlice({
  name: 'article',

  initialState: {
    // allArticles: [] as any,
    // allArticlesMilestone: [] as any,
    articles: [] as any,
    currentArticle: {} as any,
  },

  reducers: {
    setArticles: (state, action: PayloadAction<any>) => {
      state.articles = action.payload;
    },

    updateArticles: (state, action: PayloadAction<any>) => {
      const oldArticles = state.articles.filter((article: any) => {
        article.id !== action.payload.id;
      });
      state.articles = [...oldArticles, action.payload];
    },

    createArticle: (state, action) => {
      state.articles = [...state.articles, action.payload];
    },

    deleteArticle: (state, action) => {
      state.articles = state.articles.filter(
        (article: any) => article.id !== action.payload.id
      );
    },
    setCurrentArticle: (state, action) => {
      console.log('action payload article', action.payload);
      state.currentArticle = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setArticles,
  updateArticles,
  createArticle,
  deleteArticle,
  setCurrentArticle,
} = ArticleSlice.actions;

export const selectArticle = (state: RootState) => state.article;

export default ArticleSlice.reducer;
