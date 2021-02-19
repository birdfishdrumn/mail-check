import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
// import HelpModal from "../Dialog/HelpModal";
import Reservation from '../Reserve/Reservation';

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

interface Props {
  id?: string
}

const FloatingAction:React.FC<Props> = ({id}) => {
  const classes = useStyles();

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 const style = {

    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
   position: 'fixed',
    zIndex:999

  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
    <div className="sm-only" onClick={handleClickOpen}>
      <Fab  variant="extended" style={style as any} color="primary" aria-label="add" >
        予約を追加
      </Fab>

      {/*ダイアログ */}

    </div>
   <div>

        <Dialog      fullScreen={fullScreen} open={open} className={classes.dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title" className="center">{title}</DialogTitle> */}
          <DialogContent>

              <Reservation/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>

        </DialogActions>
      </Dialog>
      </div>
      </>
  );
}

export default FloatingAction
