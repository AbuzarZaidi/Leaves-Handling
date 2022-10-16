import { createSlice } from '@reduxjs/toolkit';
import dayjs from "dayjs";
const initialCounterState = { startDate:dayjs(),endDate:dayjs(),reset:false};
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
          setReset(state,action){
            state.reset=action.payload;
          }
    }

})
export const {
   setStartDateHandler,setEndDateHandler,setReset
  } = leaveSlice.actions;
export default leaveSlice.reducer;