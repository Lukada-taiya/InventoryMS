import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp'; 
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings'; 
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Dashboard from './pages/Dashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
              <PageTitle title="Dashboard | BowMarie" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | BowMarie" />
              <Dashboard />
            </>
          }
        /> 
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | BowMarie" />
              <Profile />
            </>
          }
        />        
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | BowMarie" />
              <Settings />
            </>
          }
        />  
        <Route
          path="/pages/settings"
          element={
            <>
              <PageTitle title="Alerts | BowMarie" />
              <Settings />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
