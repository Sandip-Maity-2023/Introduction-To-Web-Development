import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function UseGetCurrentUser() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const publicRoutes = ["/signin", "/signup", "/forgot-password"];
    if (publicRoutes.includes(pathname)) {
      dispatch(setUserData(null));
      return;
    }

    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        });

        if (result.status >= 400) {
          dispatch(setUserData(null));
          return;
        }

        dispatch(setUserData(result.data));
      } catch {
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch, pathname]);
}

export default UseGetCurrentUser;
