import { createSlice } from '@reduxjs/toolkit';
const initialCounterState = { id:"",isLogin:false,active:0,userName:"",position:"",location:"/applyforleaves"};
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
          setPositionHandler(state, action) {
            state.position=action.payload;
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
  state.location=action.payload;
},
    }
})
export const {
    setIdHandler,setlogoutHandler,setActiveHandler,setNameHandler,setLocationHandler,setLoginHandler,setPositionHandler
  } = authSlice.actions;
export default authSlice.reducer;