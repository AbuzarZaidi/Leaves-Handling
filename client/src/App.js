import React,{useState} from 'react'
import axios from 'axios'
// 6339e961f46fed48377d3cb2
const url='http://localhost:5000/user/leaveRequest/6339e961f46fed48377d3cb2'
function App() {
  const [date1,setDate1]=useState("")
  const [date2,setDate2]=useState("")
  const [reason,setReason]=useState("")
  const sendData=()=>{
const newLeave={
  reason:reason,
  fromDate:date1,
  toDate:date2
}
try {
  const createLeave=axios.post(url,newLeave)
  console.log(createLeave)
} catch (error) {
  console.log(error);
  
}
   
   
  }
  return (
    <div>
      <input type="date" name="date1"  onChange={(e)=>setDate1(e.target.value)}/>
      <input type="date" name="date2"  onChange={(e)=>setDate2(e.target.value)}/>
      <input type="text" name="reason"  onChange={(e)=>setReason(e.target.value)}/>
      <button onClick={sendData}>send</button>
    </div>
  );
}

export default App;
