import React,{useState} from 'react';
import { withStyles,WithStyles,createStyles, Theme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { db } from "../../firebase/firebase";


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface PROPS {

  id: string;
  uid?: string;
  handleClose: ()=>void
}



 const  CustomDialog:React.FC<PROPS> = (props) =>{
  const [open, setOpen] =useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   const deletePost = (id: string) => {
  return   db.collection("reservation").doc(id).delete()



   }
   console.log(props.id)

  return (
    <div>

      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          予約のキャンセル
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           削除された予約は復元できません。よろしいですか？
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>deletePost(props.id)} color="primary">
            削除する
          </Button>
</DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog



// export const deletePost = (id: string,uid:string) => {
//   return async (dispatch: AppDispatch,getState) => {

//     postsRef.doc(id).delete()
//       .then(() => {
//         //getStateで現在のstoreの情報を取得する。ここでは現在のposslistを取得してprevPostsに代入
//         const prevPosts = store.getState().post.post.userList;
//         // 今回削除した以外の配列を残す
//         const nextPosts = prevPosts.filter(post => post.id !== id)
//         dispatch(deletePostAction(nextPosts))
//       })
//         // db.collection("users").doc().collection("likes").where("postId", "==", id)


//   }
// }
// import React,{useState} from 'react';
// import { withStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
// // import { deletePost } from "../../../reducks/posts/operations";
// // import {useSelector,useDispatch} from "react-redux";
// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

//  const  CustomDialog = (props) =>{
//   const [open, setOpen] =useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>

//       <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
//           作品の削除
//         </DialogTitle>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             削除されたデータは復元できません。削除してよろしいですか？
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           {/* onClick={()=>dispatch(deletePost(props.id))}  */}
//           <Button onClick={()=>deletePost()} color="primary">
//             削除する
//           </Button>
// </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default CustomDialog
