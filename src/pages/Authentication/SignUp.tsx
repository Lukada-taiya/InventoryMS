import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../../components/Header';  
import {logo, building} from '../../images/index'; 
import UserIcon from '../UiElements/UserIcon';
import { EmailIcon } from '../UiElements/EmailIcon';
import { LockIcon } from '../UiElements/LockIcon';

interface StateTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {

  const [state, setState] = React.useState<StateTypes>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateState = (key: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }
  return (
    <>
      <Header showUser={false} />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="hidden w-full xl:block xl:w-2/5">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">  
                <img className="h-30 w-full rounded-lg object-cover object-center" src={logo} alt="Logo" />
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

              <form>
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon/>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <EmailIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <LockIcon/>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <LockIcon/>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>                

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/signin" className="text-primary">
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
