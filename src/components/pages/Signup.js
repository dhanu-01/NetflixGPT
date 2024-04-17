import React, { useState } from "react";
import Header from "./Header";
import NtfxInput from "../uicomponents/NtfxInput";
import Button from "../uicomponents/Button";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/functions/common";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/userSlice";
import Cookies from 'universal-cookie';
import { NETFLIX_BG } from "../../utils/functions/constants";
import { PHOTOURL } from "../../utils/functions/constants";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
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
    let nameError = validateName(values.fullName);
    setErrors((state) => ({ ...state, ["email"]: emailError }));
    setErrors((state) => ({ ...state, ["password"]: passwordError }));
    setErrors((state) => ({ ...state, ["fullName"]: nameError }));
    if(
      emailError === "" &&
      passwordError === "" &&
      nameError === ""
    ){
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed up
          navigate("/browse");
          const user = userCredential.user;
          if (user) {
            toast.success("user registration sucessfull !", {
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
            const displayName = values.fullName;
            updateProfile(user, {
              displayName: displayName,
              photoURL: PHOTOURL,
            })
              .then(() => {
                const { uid, email,displayName,photoURL} = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL:  photoURL,
                  })
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error) {
            toast.error(errorMessage, {
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
  }
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
            Sign Up
        </h2>

          <NtfxInput
            type="text"
            placeholder="Full Name"
            changeCallback={onChangeValues}
            id="fullName"
            error={errors.fullName}
          />
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

        <Button text= "Sign Up" className='bg-[#e50914] w-full p-2 my-5 rounded'/>
        <p
          className="text-[#737373] cursor-pointer"

        >
          Already registered?&nbsp;
          <span className="text-[#fff]">
              <Link to="/">Sign in now.</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
