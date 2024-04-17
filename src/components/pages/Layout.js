import React from 'react'
import Login from './Login'
import Browse from './Browse'
import {auth} from '../../Firebase/firebase';
import {onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { addUser,removeUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux'
import { Routes,Route, Navigate, Outlet } from 'react-router-dom';
import Signup from './Signup';
import Cookies from 'universal-cookie';

const Layout = () => {

  const dispatch = useDispatch();
  const Cookie = new Cookies();

  useEffect(()=>{
   const unsubscribe  = onAuthStateChanged(auth, (user) => {
     if (user) {
       const {uid, email, displayName, photoURL} = user;
       dispatch(addUser({uid:uid,email:email,displayName: displayName,photoURL:photoURL}));
       Cookie.set('user',user);
     } else {
         dispatch(removeUser());
        Cookie.remove('user')
     }
   });

   //
   return () => unsubscribe();
  },[]);

  const AuthProvider = () => {
    const user = Cookie.get('user');
    if(!user){
      return <Navigate to='/'/>
    }else {
      return <Outlet/>
    }
  }

  const UserAuth = () => {
    const user = Cookie.get('user');
    if(user){
      return <Navigate to = '/browse'/>
    }else {
      return <Outlet/>
    }
  }

 
  return (
    <Routes>
        
      <Route element={<UserAuth/>}>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
      </Route>


        <Route element={<AuthProvider/>}>
          <Route path='/browse' element={<Browse/>}/>
       </Route>
    </Routes>
  )
}

export default Layout;