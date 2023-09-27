import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  }

  function resetLoginState() {
    setLoginDetails({
      email: "",
      password: "",
    });
  }

  async function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    console.log("calling login", loginDetails);
    const response = await dispatch(login(loginDetails));
    if (response.payload) navigate("/");
    else resetLoginState();
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
         <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>

          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Login</h2>
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="email"
              autoComplete="one-time-code"
              type="text"
              placeholder="email..."
              value={loginDetails.email}   // for reset
              className="input text-white input-bordered input-primary w-full max-w-xs rounded-3xl"
            />
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="password"
              autoComplete="one-time-code"
              type="password"
              placeholder="password..."
              value={loginDetails.password}   // for reset
              className="input text-white input-bordered input-primary w-full rounded-3xl max-w-xs"
            />
          </div>
          <div className="w-full card-actions mt-4">
            <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-3xl ">
              Submit
            </button>
            <p className="text-1 text-white" >
              Do not hava an account ? <Link to="/signup" className="text-yellow-200 font-semibold hover:text-white" > Signup Instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
