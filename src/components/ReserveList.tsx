import React,{useState} from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';

var moment = require("moment");
const columns: ColDef[] = [

  { field: 'id', headerName: 'id', width: 100 },
    { field: 'selectedDate', headerName: '体験日', width: 100 },
   { field: 'time', headerName: '時間', width: 100 },
  { field: 'name', headerName: 'お名前', width: 130 },
  { field: 'people', headerName: '人数', width: 100 },
      { field: 'content', headerName: '体験内容', width: 150 },
  { field: 'email', headerName: 'email', width: 330 },
   { field: 'phone', headerName: 'Tell', width: 200 },
  { field: 'message', headerName: '備考', width: 300 },

  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },

];

// const rows = [
//   { selectedDate: 1, time: 'Snow', name: 'Jon', people: , content: "", email:"",phone:"",message:"" },

// ]
//   <span>{item.selectedDate.toDate().toLocaleDateString()
// }</span>



export default function ReserveList({ data }) {

  const dataCheck = data.map((item)=>item.check)
console.log(dataCheck)
const [check,setCheck] = useState(false)




const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(!check);
  };

  const Form = () =>
  (    <FormControlLabel
        control={<Checkbox checked={check} onChange={handleChange} name="checkedA" />}
        label="Secondary"
      />)


  // const D = data.filter((d, index) => (

  //  {id:index,selectedDate:moment.unix(d.selectedDate), time: d.time, name: d.name, people: d.people, content: d.content, email:d.email,phone:d.phone,message:d.message})
  // )


   const D = data.map((d,index) =>(
   {id:index,selectedDate:d.selectedDate.toDate().toLocaleDateString(), time: d.time, name: d.name, people: d.people, content: d.content, email:d.email,phone:d.phone,message:d.message}
  ))
console.log(moment())

  return (
    <div style={{ maxHeight: "5000px", height: "1000px", width: '100%', }}>
       <Form/>

     <DataGrid rows={D} columns={columns} pageSize={50} checkboxSelection />


    </div>
  );
}

// check: false
// content: "絵付け体験"
// email: "pomeofishbird0303@gmail.com"
// message: ""
// name: "颯太"
// people: "5"
// phone: "1111"
// published_at: t {seconds: 1613607964, nanoseconds: 673000000}
// selectedDate:
