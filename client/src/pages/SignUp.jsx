import React from "react";
import { Link } from "react-router-dom";
import {Label, TextInput, Button} from 'flowbite-react';
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          {/* left */}
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Asoh Yannick's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to my ultimate MERN Stack web developement blog. Please, you can sign up
            with your username and password to get latest weekly information
            about the MERN stack from my blog.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value='Enter your username'/>
              <TextInput
                type='text'
                placeholder='Enter your username'
                id="username"
              />
            </div>
            <div>
              <Label value='Enter your email address'/>
              <TextInput
                type='email'
                placeholder='Enter your email'
                id="email"
              />
            </div>
            <div>
              <Label value='Enter your password'/>
              <TextInput
                type='password'
                placeholder='Enter your password'
                id="password"
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SignUp;
