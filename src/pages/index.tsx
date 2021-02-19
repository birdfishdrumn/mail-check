import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { db,auth } from "../firebase/firebase"
import React, { useEffect, useState } from "react"
import {Reserve} from "../types/reserveData"
import Layout from "../components/Layout";
import ReserveList from "../components/ReserveList"
import FloatingAction from "../components/FloatinAction/FloatingAction";
import TestReserve from "../components/TestReserve";
import { useRouter } from 'next/router'
export default function Home() {




  const [data, setData] = useState<Reserve[]>([])
  useEffect(() => {
    db.collection("reservation").orderBy("published_at","desc").onSnapshot((snapshot) => {
      const list =[]
      snapshot.forEach((docs) => {
        list.push(docs.data())

      })
      console.log(list)
      setData(list)
   })
  }, [])




  console.log(data)

const props = [
  { id: 1, name: 'Fizz'},
  { id: 2, name: 'Buzz'},
  { id: 3, name: 'FizzBuzz'}
];

  const [, , { name }] = props;

console.log(name); // "FizzBuzz"

  return (
    <div>
      <FloatingAction/>
      <TestReserve data ={data as any}/>
    </div>
  )
}



//  const listenAuthState = () => {
//   return async (dispatch) => {
//     return auth.onAuthStateChanged(user => {
//       if (user) {
//  const uid = user.uid

//           db.collection("users").doc(uid).get()
//             .then(snapshot => {
//               const data:any= snapshot.data()
//              console.log(data)
//               dispatch(login({
//                 isSignedIn: true,
//                 role: data.role,
//                 uid: uid,
//                 email: data.email,
//                 username: data.username,
//                 avatar: data.avatar
//               }))

//             })

//       } else {
//         dispatch(push("/signin"))
//       }
//     })

//   }
// }
