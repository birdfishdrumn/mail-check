import firebase from "firebase/app"



export type Reserve = {
check:boolean
content:string
email:string
message: string
name: string
people:number
phone: string
selectedDate: firebase.firestore.Timestamp
}
