import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces/product.interface";
// import store from "../store";

interface IState {
    products: IProduct[];
    status: string;
}

const initialState: IState = {
    products: [],
    status: 'loading'
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: { },
    extraReducers: { }
});

export const articlesReducer = articlesSlice.reducer;

// export type RootState = ReturnType<typeof store.getState>;