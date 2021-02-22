import React, { forwardRef,useState,useCallback,useEffect } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import DeleteIcon from '@material-ui/icons/Delete';
import { AddBox, Edit, DeleteOutline, Check, Clear, Search, Close, Filter, ChevronRight,Message } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteDialog from "../components/Ui/DeleteDialog";

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Contact } from "../types/contactData";
import Checkbox from '@material-ui/core/Checkbox';
import {db} from "../firebase/firebase"


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position:"relative"
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dialog:{
    margin: 0,
  }
}));

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => (
    <AddBox {...props} ref={ref} />
  )),
  Delete: forwardRef<SVGSVGElement>((props, ref) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  Edit: forwardRef<SVGSVGElement>((props, ref) => (
    <Edit {...props} ref={ref} />
  )),
  Check: forwardRef<SVGSVGElement>((props, ref) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef<SVGSVGElement>((props, ref) => (
    <Clear {...props} ref={ref} />
  )),
    Search: forwardRef<SVGSVGElement>((props, ref) => (
    <Search {...props} ref={ref} />
    )),
    Close: forwardRef<SVGSVGElement>((props, ref) => (
    <Close {...props} ref={ref} />
    )),
    Filter: forwardRef<SVGSVGElement>((props, ref) => (
      <Filter style={{fontSize:0}} {...props} ref={ref} />
    )),
    Message: forwardRef<SVGSVGElement>((props, ref) => (
    <Message {...props} ref={ref} />
  )),
}
// interface Props {
//  data: Reserve
// }

const contact: React.FC = () => {

    const [data, setData] = useState<Contact[]>([])
  useEffect(() => {
    db.collection("contacts").orderBy("published_at","desc").onSnapshot((snapshot) => {
      const list =[]
      snapshot.forEach((docs) => {
        list.push(docs.data())

      })
      console.log(list)
      setData(list)
   })
  }, [])



    const classes = useStyles();
   const [openModal,setOpenModal] = useState<boolean>(false)
const [name,setName] = useState("")
  const [deleteId,setDeleteId] = useState<string>("")
  const DeleteClose = useCallback(() => {
     setOpenModal(false)

  },[setOpenModal])

  // const handleClickOpen = (id: string) => {
  //   setOpen(true);
  //   setProps(id)
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const DeleteOpen = (id: string,name:string) => {
    setOpenModal(true)
    setName(name)
    setDeleteId(id)
 }

  const theme = useTheme();

  return (
    <div>
    <MaterialTable
      icons={tableIcons}

      title="お問い合わせ"
        columns={[
        //   {
        //   title:"予約",field:"check"
        // },
        {
          title: 'お名前', field: 'name',
          cellStyle: {

            fontSize: "0.9rem"
          },
          headerStyle: {

          }
          },
        {
          title: 'email',
          field: 'email',
          cellStyle: {
            fontSize: "0.9rem"
          }

          },
           {
          title: '件名',
          field: 'subject',
          cellStyle: {
            fontSize: "0.9rem"
          }

          },
              {
          title: '内容',
          field: 'message',
          cellStyle: {
            fontSize: "0.9rem",
            width: "500px"
          },
             headerStyle: {
 width: "500px"
          }

        },

      ]}


      data={(data as any).map((d, index) => (

        { id: d.id,  name: d.name, email: d.email, subject:d.subject, message: d.message }
      ))}


      //     data={data.map((d, index) => (
      //   {check:d.check}

      // ))}



      actions={[
        rowData => ({
          icon: () => <DeleteOutline />,
          tooltip: 'Delete User',
          onClick: (event, rowData: Contact) => { DeleteOpen(rowData.id,rowData.name) }
        }),

      ]}


      // }
      options={{
        actionsColumnIndex: -1,
     filtering:true,
      search: true,
       exportButton: true
      }}
      />


      {openModal && <DeleteDialog name={name} contact = "true" handleClose={DeleteClose}   id={deleteId}/>}

    </div>

  )
}
export default contact
