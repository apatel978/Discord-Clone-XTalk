import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
// import Navigation from "../components/Navigation/Navigation";
import{ useSelector } from "react-redux"

export default function Layout() {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <ModalProvider>
        {isLoaded && <Outlet /> }
        <Modal />
    </ModalProvider>
    </>
  );
}
