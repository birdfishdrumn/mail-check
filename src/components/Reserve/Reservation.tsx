 import React, { useState,useCallback,useEffect } from "react"
import TextField from "@material-ui/core/TextField";
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from "../Ui/TextInput"
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { db } from "../../firebase/firebase"
import InputLabel from '@material-ui/core/InputLabel';
import firebase from "firebase/app"
import "firebase/firestore"
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
   KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useRouter } from 'next/router'
import { People } from "@material-ui/icons";
import Select from '@material-ui/core/Select';
import { Reserve } from "../../types/reserveData";
import Snackbar from "../Ui/Snackbar"

const useStyles = makeStyles((theme) => ({

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

interface Props {
  id?: string
}



const Reservation:React.FC<Props> = ({id}) => {
 const disableMonday = (date) =>{

    return date.getDay() === 1;
 }
  const router = useRouter()
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState(1);
    const [phone, setPhone] = useState("");
  const [time, setTime] = useState("")
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [snackOpen,setSnackOpen] = useState(false)
  const dt = new Date()
  // const week = dt.setDate(dt.getDate() + 7)
  const minDate =dt.setDate(dt.getDate() + 3)
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState(dt.setDate(dt.getDate()));

console.log(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
    const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
    );
    const inputPhone = useCallback(
    (event) => {
      setPhone(event.target.value);
    },
    [setPhone]
    );
    const inputPeople = useCallback(
    (event) => {
      setPeople(event.target.value);
    },
    [setPeople]
    );
    const inputMessage = useCallback(
    (event) => {
      setMessage(event.target.value);
    },
      [setMessage]
    );
  const selectPeople= (event) => {

    setPeople(
event.target.value,
    );
  };

    const selectTime = (event) => {

    setTime(
event.target.value,
    );
  };

  const handleChange = (event) => {

    setContent(
event.target.value,
    );
  };
  // データ登録の関数
      const timestamp = firebase.firestore.Timestamp.now();
  const ref = db.collection("reservation").doc()
  if (!id) {
      id = ref.id;
  } else {
     useEffect(() => {
      if (id !== "") {
        db.collection("reservation").doc(id).get().then((snapshot) => {
          const data = snapshot.data();
          setName(data.name)
          setEmail(data.email)
          setPhone(data.phone)
          setContent(data.content)
          setPeople(data.people)
          setTime(data.time)
          setSelectedDate(data.selectedDate.toDate())

        })
      }
    }, [])
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await db.collection("reservation").doc(id).set({
           name: name,
            email: email,
            phone: phone,
            content: content,
            selectedDate: selectedDate,
            time: time,
            message: message,
            people: people,
            check: false,
      published_at: timestamp,
       id: id
    }, {
    merge:true
    }).then(() => {
   setSnackOpen(true)
  })
  }
  // データ登録の関数


  // 入力されていないとボタンを押せない
  const canSubmit = () => {
    if (name === "") return true;


    if (content === "") return true;

      if (selectedDate === null) return true;
if (time === "") return true;



    return false;
  };




  return (
    <div className="contact center">

       <form onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

        <TextInput
          id={name}
          fullWidth={true}
          label={"お名前"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          variant="outlined"
          value={name}
          type={"text"}
          name="name"
        />
        <div className="space-s" />
        <TextInput
          id={email}
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          onChange={inputEmail}
          rows={1}
          variant="outlined"
          value={email}
          type={"email"}
          name="email"
        />

            <TextInput
          id={phone}
          fullWidth={true}
          label={"電話番号"}
          multiline={false}
          required={true}
          onChange={inputPhone}
          rows={1}
          variant="outlined"
          value={phone}
          type={"tell"}
          name="tell"
        />
        <div className="space-s" />

        <div className="space-s" />
            <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">人数</InputLabel>
        <Select
          native
          value={people}
          onChange={selectPeople}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
            <option value={"1"}>1</option>
             <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
            <option value={"5"}>5</option>
             <option value={"6"}>6</option>

        </Select>
        </FormControl>
                <div className="space-m" />





  <FormControl component="fieldset">
          <FormLabel component="legend">体験内容</FormLabel>
               <div className="space-s" />
      <RadioGroup aria-label="gender" name="content" value={content} onChange={handleChange}>
        <FormControlLabel value="絵付け体験" control={<Radio />} label="絵付け体験" />
        <FormControlLabel value="ガラス吹き体験" control={<Radio />} label="ガラス吹き体験" />
      </RadioGroup>
    </FormControl>
        <div className="space-l" />

      <MuiPickersUtilsProvider utils={DateFnsUtils}   locale={jaLocale}>
            <KeyboardDatePicker
              disablePast
              shouldDisableDate={disableMonday}
              minDate={minDate}

          margin="normal"
          id="date-picker-dialog"
          label="体験希望日"
          format="yyyy/MM/dd"
              value={selectedDate}
              name="message"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
            />
            </MuiPickersUtilsProvider>


        <div className="space-s" />
            <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">体験時間</InputLabel>
        <Select
          native
          value={time}
          onChange={selectTime}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
              <option value={"10:30"}>10:30</option>
              <option value={"11:00"}>11:00</option>
            <option value={"13:00"}>13:00</option>
            <option value={"14:00"}>14:00</option>
             <option value={"15:00"}>15:00</option>

        </Select>
        </FormControl>
        <div className="space-m" />
           <TextInput
          id={message}
          fullWidth={true}
          label={"備考"}
          placeholder="何かご希望がございましたお描き下さい。"
          multiline={true}
          required={false}
          onChange={inputMessage}
          rows={5}
          variant="outlined"
          value={message}
          type={"text"}
          name="message"
        />
        <div className="space-m" />

        <div className="contact__btn">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={canSubmit()}
          >
            送信
              </Button>
        </div>
      </form>
      <Snackbar snackOpen={snackOpen} setSnackOpen={setSnackOpen}/>
    </div>
  )
}

export default Reservation
