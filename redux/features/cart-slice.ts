import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface product{
    id: number,
    quantity: number,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            // Logique pour ajouter un produit au panier
            // @ts-ignore
            state.push(action.payload)
        },
        removeProduct: (state, action) => {
            // Logique pour supprimer un produit du panier
            // @ts-ignore
            return state.filter((item) => item.id !== action.payload);
        },
    },
});
export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;