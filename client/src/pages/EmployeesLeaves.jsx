import React,{useState} from 'react'
import axios from 'axios'
const url='http://localhost:5000/admin/employeesLeaves'
const EmployeesLeaves = () => {
    const [userName,setUserName]=useState("")
    const [month,setMonth]=useState("")
    const [year,setYear]=useState("")
    const getData=()=>{
        // console.log(userName)
        // console.log(month)
        // console.log(year)
        const getresult={
            userName:userName,
            month:month,
            year:year
        }
        try {
          const result=axios.post(url,getresult)
          console.log(result)

        } catch (error) {
          console.log(error);
          
        }
           
           
          }
  return (
    <>
   <input type="text" onChange={(e)=>setUserName(e.target.value)}/>
   <input type="text" onChange={(e)=>setMonth(e.target.value)}/>
   <input type="text" onChange={(e)=>setYear(e.target.value)}/>
   <button onClick={getData}>Search</button>
   </>
  )
}

export default EmployeesLeaves