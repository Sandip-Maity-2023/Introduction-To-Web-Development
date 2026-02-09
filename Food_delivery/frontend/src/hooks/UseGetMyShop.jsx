import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetMyshop() {

    const dispatch=useDispatch()

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my`, 
          {withCredentials: true}
        );
        //console.log(result);
        dispatch(setUserData(result.data))
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser()
  }, []);
}

export default useGetMyshop;
