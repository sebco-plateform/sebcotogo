import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface cartModel{
    id: number,
    image: string,
    name: string,
    price: number,
    quantity: number,
    priceTotal: number,
}

const initialState = {
    items: [], // Liste initiale vide
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state: any, action) => {
            state.items.push(action.payload); // Ajouter un élément à la liste
        },
        removeProduct: (state: any, action) => {
            // Logique pour supprimer un produit du panier

            state.items = state.items.filter((item: { id: any; }) => item.id !== action.payload); // Supprimer un élément de la liste
        },

        updateProduct: (state: any, action) => {
            const { id, updatedItem } = action.payload;
            const index = state.items.findIndex((item: { id: any; }) => item.id === id);
            if (index !== -1) {
                state.items[index] = updatedItem; // Mettre à jour un élément dans la liste
            }

        },
    },
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default persistedReducer;