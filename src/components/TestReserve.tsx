import React, { forwardRef,useState,useCallback } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import DeleteIcon from '@material-ui/icons/Delete';
import { AddBox, Edit, DeleteOutline, Check, Clear, Search, Close, Filter, KeyboardArrowRight } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteDialog from "./Ui/DeleteDialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Reservation from './Reserve/Reservation';
import { Reserve } from "../types/reserveData";
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
    <Filter {...props} ref={ref} />
    )),
    KeyboardArrowRight: forwardRef<SVGSVGElement>((props, ref) => (
    <KeyboardArrowRight {...props} ref={ref} />
  )),
}
interface Props {
 data: Reserve
}

const TestReserve:React.FC<Props> = ({ data  }) => {

    const classes = useStyles();
   const [openModal,setOpenModal] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
  const [props, setProps] = useState<string>("")
  const [deleteId,setDeleteId] = useState<string>("")
  const DeleteClose = useCallback(() => {
     setOpenModal(false)

  },[setOpenModal])

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setProps(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DeleteOpen = (id: string) => {
    setOpenModal(true)
    setDeleteId(id)
 }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
    <MaterialTable
      icons={tableIcons}

      title="予約管理"
        columns={[
          {
          title:"予約",field:"check"
        },
        {
          title: 'お名前', field: 'name',
          cellStyle: {
            width: 400,
            fontSize: "0.9rem"
          },
          headerStyle: {
            width: "400px",
          }
        },
        {
          title: '体験日時', field: 'selectedDate', cellStyle: {
            fontSize: "0.9rem"
          }
        },
        {
          title: '時間', field: 'time', cellStyle: {
            fontSize: "0.9rem"
          }
        },
        {
          title: '人数',
          field: 'people',
          cellStyle: {
            fontSize: "0.9rem"
          }

        },
        {
          title: '内容',
          field: 'content',


          cellStyle: {
            width: "400px",
            fontSize: "0.9rem"
          },
          headerStyle: {
            width: "400px",
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
          title: 'phone',
          field: 'phone',
          cellStyle: {
            fontSize: "0.9rem"
          }
        },
      ]}


      data={(data as any).map((d, index) => (

        { check:d.check,id: d.id, selectedDate: d.selectedDate.toDate().toLocaleDateString(), time: d.time, name: d.name, people: d.people, content: d.content, email: d.email, phone: d.phone, message: d.message }
      ))}


      //     data={data.map((d, index) => (
      //   {check:d.check}

      // ))}



      actions={[
        {
          icon:  () => <Edit />,
          tooltip: "edit",
          onClick: (event, rowData: Reserve) =>  {handleClickOpen(rowData.id)}
        },
        rowData => ({
          icon: () => <DeleteOutline />,
          tooltip: 'Delete User',
          onClick: (event, rowData: Reserve) => { DeleteOpen(rowData.id) }
        })
      ]}

      detailPanel={

        rowData => {
          return (
            <div
              style={{
                fontSize: "1rem",
                textAlign: 'center',

              }}
            >
              {rowData.message}
            </div>

          )
        }
      }
      options={{
        actionsColumnIndex: -1,
     filtering:true,
      search: true,

      }}
      />

              <Dialog   fullScreen={fullScreen} open={open} className={classes.dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title" className="center">{title}</DialogTitle> */}
          <DialogContent>
          {props}
          <Reservation id={props}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>

        </DialogActions>
      </Dialog>
         {openModal && <DeleteDialog  handleClose={DeleteClose}   id={deleteId}/>}

    </div>

  )
}
export default TestReserve
