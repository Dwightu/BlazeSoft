import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

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

export type RootState = {
  books: Book[];
  nextId: number;
}

export type State = { root: RootState }

const initialState: RootState = {
  books: [
    {
      name: "To Kill a Mockingbird",
      price: 15.99,
      category: "Classic Literature",
      description: "Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South — and the heroism of one man in the face of blind and violent hatred.",
      id: 1,
    },
    {
      name: "1984",
      price: 9.99,
      category: "Dystopian Fiction",
      description: "A novel by George Orwell, published in 1949 as a warning against totalitarianism. The chilling dystopia made a deep impression with its portrayal of a totalitarian government that controls thought and denies reality.",
      id: 2,
    },
    {
      name: "Becoming",
      price: 11.99,
      category: "Autobiography",
      description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work.",
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
  // selectors: {
  //   selectBooks: (state) => state.books,
  // },  
});

export const { addOneBook, removeBook, updateBook } = bookSlice.actions;
// export const { selectBooks } = bookSlice.selectors;
export const selectBooks = (state: State) => state.root.books;

export const makeStore = () => {
  return configureStore({
    reducer: {
      root: bookSlice.reducer,
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
