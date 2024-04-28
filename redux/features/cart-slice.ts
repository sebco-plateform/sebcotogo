import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface cartModel{
    id: number,
    image: string,
    name: string,
    price: number,
    quantity: number,
    priceTotal: number,
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

            return state.filter((item: any) => item.id !== action.payload);
        },

        updateProduct: (state, action) => {
            // Logique pour mettre à jour un produit dans le panier
            const { index, updatedProduct } = action.payload;
            // Créer une copie du tableau de produits
            const newArray: any[] = [...state];
            // Mettre à jour le produit à l'index spécifié avec le nouveau produit
            newArray[index] = updatedProduct;
            // Retourner le nouveau tableau mis à jour

        },
    },
});
export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;