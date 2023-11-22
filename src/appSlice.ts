import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAutherUser } from "./interface";

interface IAppState {
  authUser: IAutherUser | null;
  token: string | null;
}

const initialState: IAppState = {
  authUser: null,
  token: null,
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<IAutherUser | null>) => {
      state.authUser = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthUser, setToken } = AppSlice.actions;
export default AppSlice.reducer;
