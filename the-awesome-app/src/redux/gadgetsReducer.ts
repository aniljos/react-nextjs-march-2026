import { CartItem } from "@/models/CartItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GadgetState = {
    cart: CartItem[],
    
}
const initialState: GadgetState = {
    cart: [],
    
}

//action: {type: "addtocart", payload: CartItem}
//action: {type: "removeitem", id: 1}
export const gadgetsReducer = (state=initialState, action) => {

    if(action.type === "addtocart" && action.payload){

        //state.cart.push(action.payload);
        const cart = [...state.cart];
        cart.push(action.payload);
        return {
            ...state,
            cart: cart,
        }
    }
    return state;
}


