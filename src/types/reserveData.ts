import firebase from "firebase/app"



export type Reserve = {
  id:string
check:boolean
content:string
email:string
message: string
name: string
people:string
phone: string
selectedDate: firebase.firestore.Timestamp
}
