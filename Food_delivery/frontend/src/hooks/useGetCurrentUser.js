import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {

    const dispatch=useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        //console.log(result);
        dispatch(setUserData(result.data))
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
}

export default useGetCurrentUser;
