import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>

      <form className="bg-black opacity-85 w-4/12 mx-auto my-36 right-0 left-0 absolute text-[#fff] p-16 rounded-md">
        <h2 className="font-bold text-3xl my-2">Sign In</h2>
        <input type="text" placeholder="Email or phone number" className="w-full bg-[#333] p-2 my-2 placeholder-[#737373] rounded-sm"/>
        <input type="password" placeholder="Password" className="w-full bg-[#333] p-2 my-2 placeholder-[#737373] rounded-sm"/>
        <button className="bg-[#e50914] w-full p-2 my-5">Sign In</button>
        <p className="text-[#737373]">New to Netflix?<span className="text-[#fff]"> Sign up now.</span></p>
      </form>
    </div>
  );
};

export default Login;
