import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteProductInCart,
  getAllCart,
} from "../../services/cart";
import { Product } from "../../types";

export interface CartItem extends Product {
  quantity: number;
}

interface initialStateType {
  cart: CartItem[];
  loading: boolean;
  error: boolean;
}

const initialState: initialStateType = {
  cart: [],
  loading: false,
  error: false,
};

export const handleAddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }: { product: Product; quantity: number }) => {
    const success = await addToCart(product._id, quantity);
    return { product, success, quantity };
  }
);

export const handleGetAllCart = createAsyncThunk(
  "cart/getAllCart",
  async () => {
    const data = await getAllCart();
    return data;
  }
);

export const handleDeleteProductInCart = createAsyncThunk(
  "cart/deleteProductInCart",
  async (productId: string) => {
    const success = await deleteProductInCart(productId);
    return { success, productId };
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    plus: (state, action) => {
      state.cart[action.payload].quantity++;
    },
    minus: (state, action) => {
      state.cart[action.payload].quantity--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleAddToCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        if (
          state.cart.some((item) => item._id === action.payload.product._id)
        ) {
          state.cart = state.cart.map((item) => {
            if (item._id === action.payload.product._id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            }

            return item;
          });
        } else {
          state.cart.push({
            ...action.payload.product,
            quantity: action.payload.quantity,
          });
        }
      }
      state.loading = false;
    });
    builder.addCase(handleGetAllCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleGetAllCart.fulfilled, (state, action) => {
      const cartsResponse =
        action.payload?.products?.products?.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];

      state.cart = cartsResponse;
      state.loading = false;
    });
    builder.addCase(handleDeleteProductInCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload.productId
        );
      }
    });
    builder.addCase(handleDeleteProductInCart.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { setCart, plus, minus } = CartSlice.actions;

export default CartSlice.reducer;
