import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../services/auth";
import { User } from "../../types";

interface initialStateType {
  user: User | null | undefined;
  loading: boolean;
  error: boolean;
}

const initialState: initialStateType = {
  user: undefined,
  error: false,
  loading: false,
};

export const handleSignIn = createAsyncThunk("auth/signIn", async () => {
  const user = await getUserInfo();
  return user;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleSignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleSignIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(handleSignIn.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.error = true;
    });
  },
});

export const { setUser, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
