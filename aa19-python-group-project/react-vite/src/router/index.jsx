import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage'
import HomePage from '../components/HomePage/HomePage';
import ServerDetail from '../components/ServerDetails/ServerDetails';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import ChannelsOverview from '../components/ChannelsList/ChannelsOverview';


export const useAuth = () => {
  const user = useSelector((state) => state.session.user);
  return !!user; // Returns true if user is not null, false otherwise
};

const ConditionalHomePage = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <HomePage /> : <LandingPage />;
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ConditionalHomePage />,
      },
      {
        path: "/servers/:serverId",
        element: <ServerDetail />
      },
      {
        path: "/channels/:channelId",
        element: <ChannelsOverview />
      }
    ],
  },
]);
