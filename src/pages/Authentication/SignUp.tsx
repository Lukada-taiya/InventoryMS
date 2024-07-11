import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import { logo, building } from '../../images/index';
import UserIcon from '../UiElements/UserIcon';
import { EmailIcon } from '../UiElements/EmailIcon';
import { LockIcon } from '../UiElements/LockIcon';
import useAxios from '../../hooks/useAxios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BeatLoader } from 'react-spinners';

const schema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match.',
      });
    }
  });

type FormFields = z.infer<typeof schema>;
const SignUp: React.FC = () => { 
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
    console.log('data', data);
    try {
      const loginRes = await sendRequest({
        url: `/register`,
        method: 'POST',
        data: data,
      });
      if (loginRes?.status === 200) {
        window.location.href = "/";
      } else {
        setError('root', { message: 'Email already exists' });
      }
    } catch (e: any) {
      console.log('Login Err', e);
      if (e.response && e.response.data && e.response.data.errors) {
        const errors = e.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        setError('root', { message: errorMessages.join(' ') }); // Join all error messages into a single string
      } else {
        setError('root', { message: 'Something went wrong. Try again later.' }); // Join all error messages into a single string
      }
    }
  };

  return isAuthenticated ? (
    <Navigate to={{ pathname: '/dashboard' }} />
  ) : (
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
              <p className="2xl:px-10 mb-5.5">
                Experience Inspired by The Volta Lake.
              </p>

              <span className="mb-4 inline-block">
                <img src={building} alt="Logo" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-2/5 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to InventoryMS
              </h2>

              <form onSubmit={handleSubmit(submitHandler)}>
                {errors.root && (
                  <span className="text-red-500 text-md mb-2">
                    {errors.root.message}
                  </span>
                )}
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon />
                    </span>
                  </div>
                  {errors.name && (
                    <span className="text-red-500 text-md ml-2 mt-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                <div className="mb-6">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirm_password')}
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <LockIcon />
                    </span>
                  </div>
                  {errors.confirm_password && (
                    <span className="text-red-500 text-md ml-2 mt-2">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </div>

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
                    'Create Account'
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/" className="text-primary">
                      Sign in
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

export default SignUp;
