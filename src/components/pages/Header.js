import React from 'react'
import { useSelector } from 'react-redux';
import { auth } from '../../Firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LOGO } from '../../utils/functions/constants';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const  handleSignOut = () => {
    signOut(auth)
    .then(()=>{
      navigate("/")
    })
    .catch((error)=>{
       console.log(error);
    })
  }

  return (
    <div
     className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between'
    >
        <img
        className='w-44'
        src={LOGO}
        alt="logo"
        />

        {user &&
          <div onClick={handleSignOut} className='flex items-center gap-6'>
           {user?.photoURL && <img src={user?.photoURL} alt="altImag"/>}
           <i className="pi pi-sign-out" style={{ fontSize: '2.5rem',color: 'red', cursor: 'pointer'}}></i>
        </div>
        }
    </div>
  )
}

export default Header