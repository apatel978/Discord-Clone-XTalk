import { createBrowserRouter } from 'react-router-dom';
<<<<<<< HEAD

=======
import LandingPage from '../components/LandingPage/LandingPage'
import HomePage from '../components/HomePage/HomePage';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

import { useSelector } from 'react-redux';
>>>>>>> 2d17a94611c7ec27a34da15b31f9f78c2a51a966
import Layout from './Layout';


export const useAuth = () => {
  const user = useSelector((state) => state.session.user);
  return !!user; // Returns true if user is not null, false otherwise
};

const ConditionalHomePage = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <HomePage /> : <LandingPage />;
};

const OtherURLS = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/')

  }, [navigate])
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
<<<<<<< HEAD
        element: <h1>Welcome! meow</h1>,
      },
    
=======
        element: <ConditionalHomePage />,
      },
      {
        path: "*",
        element: <OtherURLS />
      }
>>>>>>> 2d17a94611c7ec27a34da15b31f9f78c2a51a966
    ],
  },
]);
