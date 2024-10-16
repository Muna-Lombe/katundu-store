import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { createdToastMessage } from '../../orm/models/ToastMessageModel';
import { useDispatch } from 'react-redux';
import types from '../../orm/actions/actionTypes';
import { useRecoverAccountMutation, useResetPasswordMutation } from '../../js/middleware/queryHandler';
import Toast from '../banners/Toast';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [resetPassword, { data,isLoading, isSuccess, isError, error:resetError }] = useResetPasswordMutation()
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage('');
    // setError('');

    try {
      // const response = 
      await resetPassword({ email });
      // setMessage(response.data.message);
      // dispatch(createdToastMessage({
      //   status: types.TOAST_VALID,
      //   text: {
      //     header: "Success",
      //     body: response.data.message
      //   },
      //   type: types.TOAST_SUCCESS,
      //   id: "recover password success"
      // }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An error occurred. Please try again.';
      // setError(errorMsg);
      // dispatch(createdToastMessage({
      //   status: types.TOAST_VALID,
      //   text: {
      //     header: "Error",
      //     body: errorMsg
      //   },
      //   type: types.TOAST_ERROR,
      //   id: "recover password error"
      // }));
    }
  };
  
  
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo>
            <div id="logo" className="p-1 less-than-xs:border-2 border-[4px] border-black border-spacing-2 rounded-[4px] text less-than-xs:text-base text-[2.4rem] leading-10 font-raleway lining-nums tabular-nums font-bold">
              <Link to="/" > Katundu </Link>
            </div>
          </Logo>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Recover Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" state={{ ...location }} className="font-medium text-orange-600 hover:text-orange-500">
              create a new account for free
            </Link>
          </p>
        </div>
        <div id="reset-toast" className="showtoast hidden">
          {
            isError || isSuccess && 
            <Toast error={ isError || false} message={data?.message || resetError?.data.error} onOpen={()=>{
              document.getElementById("reset-toast").classList.toggle("hidden", false)
            }}  onClose={()=>{
              document.getElementById("reset-toast").classList.toggle("hidden", true)
            }}/>
          }
        </div>
        <form id="ResetPassword-form" name="ResetPassword-form" className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="text">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white dark:text-black hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Recover Password
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default ResetPassword;