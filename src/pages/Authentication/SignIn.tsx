import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import Header from '../../components/Header';
import { logo, building } from '../../images/index';
import { EmailIcon } from '../UiElements/EmailIcon';
import { LockIcon } from '../UiElements/LockIcon';
import useAxios from '../../hooks/useAxios';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  // const {response, error, loading: loadingAsync, sendRequest : sendRequestAsync} = useAxiosAsync();
  const { loading, sendRequest } = useAxios();
  const isAuthenticated = !!sessionStorage.getItem('email');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: any) => {
    try {
      const loginRes = await sendRequest({
        url: '/login?useCookies=true',
        method: 'POST',
        data: data,
      });
      if (loginRes?.status === 200) {
        const res: any = await sendRequest({
          url: '/pingauth',
          method: 'GET',
        }); 
        if (res && res.status === 200) {
          sessionStorage.setItem('email', res.data.email);
          navigate('/dashboard');
        } else {
          sessionStorage.removeItem('email');
        }
        }else {setError("root", {message: "Invalid email or password"});}
    } catch (e : any) {
      console.log("Login Err",e);
      //TODO: Provide distinctions between exceptions
      // setError("root", {message: "Something went wrong. Try again later."});
      setError("root", {message: "Invalid email or password"});
    } 
  };

  return isAuthenticated ? (<Navigate to={{ pathname: '/dashboard' }} />):(
    <>
      <Header showUser={false} />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="hidden w-full xl:block xl:w-2/5">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="h-30 w-full rounded-lg object-cover object-center"
                  src={logo}
                  alt="Logo"
                />
              </Link>

              <p className="2xl:px-20 mb-5.5">
                A Place of True Relaxation and Accommodation for Everyone
              </p>

              <span className="mb-4 inline-block">
                <img src={building} alt="hotel" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-2/5 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to InventoryMS
              </h2>

              <form onSubmit={handleSubmit(submitHandler)}>
                {errors.root && (
                  <span className="text-red-500 text-md mb-2">
                    {errors.root.message}
                  </span>
                )}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      // type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <EmailIcon />
                    </span>
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-md ml-2 mt-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <LockIcon />
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-md ml-2 mt-2">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    {loading ? (
                      <BeatLoader
                        color={'#FFF'}
                        loading={true}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default SignIn;
