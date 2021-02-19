import React,{useState,useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from "../components/Layout";

import { useRouter } from 'next/router'
import { auth,db} from "../firebase/firebase"



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: "center",
    margin:"0 auto"
  },
  avatar: {
    margin: theme.spacing(1),
    textAlign:"center",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
 const  [email, setEmail] = useState<string>(""),
     [password, setPassword] = useState<string>("");
  const router = useRouter()


  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const signIn = (email: string, password: string) => {

    //  async () => {
    //   if (email === "" || password === "") {
    //     alert("必須項目が未入力です。")
    //     return false
    //   }
      return auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push("/")

        }).catch(() => {
          alert("パスワードかemailが違います")
        })


  }

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
              name="email"
              onChange={inputEmail}
              value={email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
              fullWidth
              onChange={inputPassword}
              value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button

            fullWidth
            variant="contained"
            color="primary"
              className={classes.submit}
              onClick={()=>  signIn(email,password)}
          >
           ログイン
          </Button>

      </div>

      </Container>
      </div>
  );
}





// import React, { useCallback, useState } from "react";
// import { TextInput, PrimaryButton } from "../components/Ui/index";
// // import { signIn } from "../reducks/users/operations";
// // import { useDispatch } from "react-redux";
// import { useRouter } from 'next/router'
// import { auth,db} from "../firebase/firebase"




// const SignUp: React.FC = (props: any) => {

//   // const dispatch = useDispatch();
//   const  [email, setEmail] = useState<string>(""),
//     [password, setPassword] = useState<string>("");
//   const router = useRouter()


//   const inputEmail = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setEmail(event.target.value);
//     },
//     [setEmail]
//   );
//   const inputPassword = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setPassword(event.target.value);
//     },
//     [setPassword]
//   );

//   const signIn = (email: string, password: string) => {

//     //  async () => {
//     //   if (email === "" || password === "") {
//     //     alert("必須項目が未入力です。")
//     //     return false
//     //   }
//       return auth.signInWithEmailAndPassword(email, password)
//         .then(() => {
//           router.push("/")
//           console.log("successs")
//         }).catch(() => {
//           alert("パスワードかemailが違います")
//         })


//   }



//   return (
//     <div className="c-section-container">
//       <h2 className="u-text__headline u-text-center">サインイン</h2>
//       <div className="module-spacer--medium"></div>

//       <TextInput
//         fullWidth={true}
//         label={"Email"}
//         multiline={false}
//         required={true}
//         rows={1}
//         value={email}
//         type={"email"}
//         variant="outlined"
//         onChange={inputEmail}
//       />
//       <TextInput
//         fullWidth={true}
//         label={"パスワード"}
//         multiline={false}
//         required={true}
//         rows={1}
//         value={password}
//         type={"password"}
//         variant="outlined"
//         onChange={inputPassword}
//       />

//       <div className="center">

//         <PrimaryButton
//           label={"サインイン"}
//           onClick={() =>
//             signIn(email,password)
//           }
//         />
//         <div className="module-spacer--medium" />
//         {/* <p className="pointer" onClick={() => router.push("/signup")}>
//           アカウントをお持ちの方はこちら
//         </p>
//          <p className="pointer" onClick={() =>router.push("/signin/reset")}>
//           パスワードを忘れた方はこちら
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default SignUp;
