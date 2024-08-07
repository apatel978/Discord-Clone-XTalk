import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage'
import HomePage from '../components/HomePage/HomePage';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

import { useSelector } from 'react-redux';
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
        element: <ConditionalHomePage />,
      },
      {
        path: "*",
        element: <OtherURLS />
      }
    ],
  },
]);
