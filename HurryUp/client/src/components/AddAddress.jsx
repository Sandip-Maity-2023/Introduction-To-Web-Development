import React from "react";
import { useForm } from "react-hook-form";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";


const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.address_line,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };
  return <></>;
};

export default AddAddress;
