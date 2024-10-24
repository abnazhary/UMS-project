import axios from 'axios';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/AuthContext';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const authContext = useContext(AuthContext); 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", data);
      localStorage.setItem("userToken", response?.data?.accessToken);

      // فحص وجود saveUserData قبل استدعائها
      if (authContext?.saveUserData) {
        authContext.saveUserData();
      }

      toast("Login successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.log(error);
      toast("Login failed");
    }
  };

  return (
    <>
      <div className="login">
        <div className="card">
          <h2>User Management System</h2>
          <h5>Sign in</h5>
          <p className="fw-light">Enter your credentials to access your account</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                {...register("username", { required: "username is required" })}
              />
              {errors.username && <span className="text-danger text-start">{errors.username.message}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && <span className="text-danger text-start">{errors.password.message}</span>}
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
