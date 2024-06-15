import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRegistration, loginUser } from '../components/Action/api.action';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { Label, Input, Button } from '@windmill/react-ui';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie';
import toast, { Toaster } from "react-hot-toast";
import config from '../utils/config';

function Login() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isUserLogin, setIsUserLogin] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    let res = await loginUser(form);
    if (res.success) {
      toast.success(res.msg);
      Cookies.set("Task-Management-Cookies", JSON.stringify(res.data));
      if(res.data.userType == 'User'){
        setTimeout(() => {
          window.location.href = `${config.baseUrl}task`;
        }, 1000);
      }else{
        setTimeout(() => {
          window.location.href = `${config.baseUrl}taskassign`;
        }, 1000);
      }
    } else {
      toast.error(res.msg);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let res = await userRegistration(form);
    if (res.success) {
      console.log(res.data)
      toast.success(res.msg);
      Cookies.set("Task-Management-Cookies", JSON.stringify(res.data));
      if(res.data.userType == 'User'){
      setTimeout(() => {
        window.location.href = `${config.baseUrl}task`;
      }, 1000);
    }else{
      setTimeout(() => {
        window.location.href = `${config.baseUrl}taskassign`;
      }, 1000);
    }
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>

          {isUserLogin ? (
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Sign up</h1>

                <Label>
                  <span>Name</span>
                  <Input className="mt-1" type="text" name="name" value={form.name} placeholder="Name" onChange={changeHandler} />
                </Label>

                <Label>
                  <span>Email</span>
                  <Input className="mt-1" type="email" name="email" value={form.email} placeholder="john@doe.com" onChange={changeHandler} />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" type="password" name="password" value={form.password} placeholder="*******" onChange={changeHandler} />
                </Label>

                <Button className="mt-4" block onClick={submitForm}>
                  Sign up
                </Button>
                <p style={{ color: 'white', textAlign: 'center' }}>or</p>
                <Button className="mt-4" block onClick={() => setIsUserLogin(false)}>
                  Login
                </Button>
              </div>
            </main>
          ) : (
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                <Label>
                  <span>Email</span>
                  <Input className="mt-1" type="email" name="email" value={form.email} placeholder="john@doe.com" onChange={changeHandler} />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" type="password" name="password" value={form.password} placeholder="***************" onChange={changeHandler} />
                </Label>

                <Button className="mt-4" block onClick={handleLoginClick}>
                  Log in
                </Button>
                <p style={{ color: 'white', textAlign: 'center' }}>or</p>
                <Button className="mt-4" block onClick={() => setIsUserLogin(true)}>
                  Sign up
                </Button>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
