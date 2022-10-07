import { createSlice } from '@reduxjs/toolkit';
const initialCounterState = { startDate:"",endDate:""};
const leaveSlice = createSlice({
    name: "applyForLeave",
    initialState: initialCounterState,
    reducers: {
        setStartDateHandler(state, action) {
            state.startDate=action.payload;
          },
          setEndDateHandler(state, action) {
            state.endDate=action.payload;
          },
    }

})
export const {
   setStartDateHandler,setEndDateHandler
  } = leaveSlice.actions;
export default leaveSlice.reducer;