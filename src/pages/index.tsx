import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { db } from "../firebase/firebase"
import React, { useEffect, useState } from "react"
import {Reserve} from "../types/reserveData"


export default function Home() {

  const [data, setData] = useState<Reserve[]>([])
  useEffect(() => {
    db.collection("reservation").get().then((snapshot) => {
      const list =[]
      snapshot.forEach((docs) => {
        list.push(docs.data())

      })
      console.log(list)
      setData(list)
   })
  }, [])

  console.log(data)
  return (
    <div className={styles.container}>
      <Head>
       {}
      </Head>

      <main className="body">
         <h1 className="title">Next.js + Tailwind CSS 🐼</h1>
        {data.map((item => (
          <h1 className="mb-4 ">{item.name}</h1>
       )))}
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
