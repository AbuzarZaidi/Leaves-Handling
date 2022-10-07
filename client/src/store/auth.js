import { createSlice } from '@reduxjs/toolkit';
const initialCounterState = { id:"",isLogin:false,active:0,userName:""};
const authSlice = createSlice({
    name: "auth",
    initialState: initialCounterState,
    reducers: {
          setIdHandler(state, action) {
            state.id=action.payload;
          },
          setNameHandler(state, action) {
            state.userName=action.payload;
          },
          setLoginHandler(state){
            state.isLogin=true;
          },
setlogoutHandler(state){
  state.isLogin=false;
},
setActiveHandler(state){
state.active=Math.floor(Math.random() * 10);
},
setLocationHandler(state,action){
  state.active=action.payload;
},
    }
})
export const {
    setIdHandler,setlogoutHandler,setActiveHandler,setNameHandler,setLocationHandler,setLoginHandler
  } = authSlice.actions;
export default authSlice.reducer;