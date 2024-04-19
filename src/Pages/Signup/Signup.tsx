import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const { authInfo } = useContext(AuthContext);
  const { createUser } = authInfo;
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = Object.values(formData).every((value) => value !== "");
    setDisabled(!isFormValid);
  }, [formData]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (formData.password.length < 6) {
      setPasswordLengthError(true);
      return;
    }

    setPasswordsMatch(true);
    setPasswordLengthError(false);

    try {
      await createUser(formData.email, formData.password);
      setFormData({
        name: "",
        email: "",
        password: "", // Clear password field
        confirmPassword: "", // Clear confirm password field
      });
      Swal.fire({
        title: "Good job!",
        text: "Congratulations! Sign Up Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
        <form className="form p-6 bg-white rounded-xl" onSubmit={onSubmit}>
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Sign Up
          </h1>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              onChange={handleInputChange}
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
                onChange={handleInputChange}
              />

              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordLengthError && (
              <span className="text-red-600 mt-1">
                Password must be at least 6 characters long
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-input w-full"
                onChange={handleInputChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {!passwordsMatch && (
              <span className="text-red-600 mt-1">
                Password and Confirm Password do not match
              </span>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={disabled}
              className="login-btn text-[16px] font-semibold text-white"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center login-account text-[16px] font-medium mt-4">
            Don’t have an account ?
            <Link to="/signup" className="create-account ms-1">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
