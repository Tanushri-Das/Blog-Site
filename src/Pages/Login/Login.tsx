import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Login = () => {
  const { authInfo } = useContext(AuthContext);
  const { login } = authInfo;
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      const user = JSON.parse(localStorage.getItem("personal-details") || "{}");
      if (!user.name) {
        navigate("/personal-details");
      } else {
        navigate(from, { replace: true });
      }
      Swal.fire({
        title: "Good job!",
        text: "You have logged in successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
      Swal.fire({
        title: "Login Failed",
        text: "Please check your email and password and try again.",
        icon: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserEmail(email);
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
        <form onSubmit={handleLogin} className="form p-6 bg-white rounded-xl">
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Login
          </h1>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Email
            </label>
            <input
              onBlur={handleEmailBlur}
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="block text-black text-[16px] font-semibold">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-input w-full"
              />

              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="login-btn text-lg font-semibold text-white px-8 py-3">
              Login
            </button>
          </div>
          <p className="text-center login-account text-[16px] font-medium mt-4">
            Don’t have an account ?
            <Link to="/signup" className="text-[#032174] ms-1">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
