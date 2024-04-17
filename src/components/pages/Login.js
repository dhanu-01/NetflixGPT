import React, { useState } from "react";
import Header from "./Header";
import NtfxInput from "../uicomponents/NtfxInput";
import Button from "../uicomponents/Button";
import {
  validateEmail,
  validatePassword,
} from "../../utils/functions/common";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { NETFLIX_BG } from "../../utils/functions/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const onChangeValues = (value, key) => {
    setErrors((state) => ({ ...state, [key]: "" }));
    setValues((state) => ({ ...state, [key]: value }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let emailError = validateEmail(values.email);
    let passwordError = validatePassword(values.password);
    setErrors((state) => ({ ...state, ["email"]: emailError }));
    setErrors((state) => ({ ...state, ["password"]: passwordError }));
    if (emailError === "" && passwordError === "") {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            navigate("/browse", {replace:true});
            toast.success("user signIn sucessfull !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error) {
            console.log(error)
            toast.error("Invalid Credentials", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        });
    } 
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img
          src={NETFLIX_BG}
          alt="background"
        />
      </div>

      <form
        className="bg-black opacity-85 w-4/12 mx-auto my-36 right-0 left-0 absolute text-[#fff] p-16 rounded-md"
        onSubmit={onSubmitForm}
      >
        <h2 className="font-bold text-3xl my-2">
          Sign In
        </h2>

        <NtfxInput
          type="text"
          placeholder="Email or Phone number"
          changeCallback={onChangeValues}
          id="email"
          error={errors.email}
        />
        <NtfxInput
          type="password"
          placeholder="Password"
          changeCallback={onChangeValues}
          id="password"
          error={errors.password}
        />

        <Button text= "Sign In" className='bg-[#e50914] w-full p-2 my-5 rounded'/>
       
        <p
          className="text-[#737373] cursor-pointer"
        >
          New to Netflix?&nbsp;
          <span className="text-[#fff]">
          <Link to="/signup">Sign up now.</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
