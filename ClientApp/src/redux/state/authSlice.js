import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser:[],
  success:false
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => 
    {
      state.currentUser =action.payload;
      state.success = true;
      sessionStorage.setItem("CurrentUser",JSON.stringify(action.payload))
      sessionStorage.setItem("Success",JSON.stringify(true));
    },
    removeUser:(state,action)=>{
      state.currentUser = [];
      state.success = false;
      sessionStorage.removeItem("CurrentUser");
      sessionStorage.removeItem("Success");
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState,removeUser } = authSlice.actions;

export default authSlice.reducer;
