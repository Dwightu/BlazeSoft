import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./features/counter/counterSlice";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
// import { book}


import { createAppSlice } from "@/lib/createAppSlice";
// import { CounterSliceState } from "../counter/counterSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export type Book = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

type BookWithoutId = Omit<Book, "id">;

type RootState = {
  books: Book[];
  nextId: number;
}

const initialState: RootState = {
  books: [
    {
      name: "Book 1",
      price: 10,
      category: "Category 1",
      description: "Description 1",
      id: 1,
    },
    {
      name: "Book 2",
      price: 20,
      category: "Category 2",
      description: "Description 2",
      id: 2,
    },
    {
      name: "Book 3",
      price: 30,
      category: "Category 3",
      description: "Description 3",
      id: 3,
    },
  ],
  nextId: 4,
};
const bookSlice = createAppSlice({
  name: "root",
  initialState,
  reducers: (create) => ({
    addOneBook: create.reducer((state, action: PayloadAction<BookWithoutId>) => {
      state.books.push({ ...action.payload, id: state.nextId });
      state.nextId++;
    }),
    removeBook: create.reducer((state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    }),
    updateBook: create.reducer((state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    }),
  }),
  selectors: {
    selectBooks: (state) => state.books,
  },  
});

export const { addOneBook, removeBook, updateBook } = bookSlice.actions;
// export const selectBooks = (state: RootState) => state.root.books;
export const { selectBooks } = bookSlice.selectors;




// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice);
// Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: {
      root: bookSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
    // },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
