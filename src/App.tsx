import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';  
import Profile from './pages/Profile';
import Settings from './pages/Settings';  
import Dashboard from './pages/Dashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="SignIn | InventoryMS" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | InventoryMS" />
              <Dashboard />
            </>
          }
        /> 
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | InventoryMS" />
              <Profile />
            </>
          }
        />        
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | InventoryMS" />
              <Settings />
            </>
          }
        />  
        <Route
          path="/pages/settings"
          element={
            <>
              <PageTitle title="Setting | InventoryMS" />
              <Settings />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="SignIn | InventoryMS" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="SignUp | InventoryMS" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
