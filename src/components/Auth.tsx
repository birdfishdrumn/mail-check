import React, { useState, useEffect } from "react";

// import { listenAuthState } from "./features/userSlice";

import { auth, db } from "../firebase/firebase"
import { useRouter } from 'next/router'
import SignIn from "../pages/login"
interface AppProps {
  children?: any
}
const Auth: React.FC<AppProps> = ({ children } ) => {

  const router = useRouter()
  const [authUser,setAuthUser] = useState(false)
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid)
        setAuthUser(true)
      }
      else {

        setAuthUser(false)
      router.push("/login")
      }
    })
  }, [])

  // もしサインインしてなければ空のjsxを返し、してるのなら子要素を返す


    // サインインしてれば子要素を返す・
  return (
    authUser ?  children : <SignIn/>
  );
    // 子要素はauthコンポーネントに入ってくるコンポーネント。
    // ここではホームコンポーネント

};

export default Auth;
