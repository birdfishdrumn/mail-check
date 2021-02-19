import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { db,auth } from "../firebase/firebase"
import React, { useEffect, useState } from "react"
import {Reserve} from "../types/reserveData"
import Layout from "../components/Layout";
import ReserveList from "../components/TrueReserve"
import FloatingAction from "../components/FloatinAction/FloatingAction";
import TestReserve from "../components/TestReserve";
import TrueReserve from "../components/TrueReserve"
import { useRouter } from 'next/router'
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


export default function Home() {


   const [active,setActive] = useState(false)

  // const openActive = () => {
  //   setActive(true)
  // }

  //  const closeActive = () => {
  //   setActive(true)
  // }

  return (
    <div>
              <ul  className="icon_flex">

        <Tooltip title="未予約" interactive>
          <li className={active ? "nonActive" : "active"}  onClick={() =>setActive(false) }><CheckBoxOutlineBlankIcon fontSize="large" /><p>未予約</p></li>
        </Tooltip>
        <Tooltip title="予約済" interactive>
          <li className={active ? "active" : "nonActive"} onClick={() => setActive(true)} ><CheckBoxIcon fontSize="large" /><p>予約済</p></li>

        </Tooltip>

     </ul>
      <FloatingAction />
      {active ?  <TrueReserve/> :  <TestReserve />}


    </div>
  )
}
