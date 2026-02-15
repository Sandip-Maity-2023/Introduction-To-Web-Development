import Address from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;
    const createAddress = await AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });

    const savedAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: { address_details: savedAddress._id },
    });

    return res.json({
      message: "Address created successfully",
      error: false,
      success: true,
      data: savedAddress,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return res.json({
      data: data,
      message: "List of all addresses",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    
    const { _id, address_line, city, state, country, pincode, mobile } =req.body;
    
    const updatedAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        country,
        mobile,
        pincode,
      },
    );

    return res.json({
      message: "Address updated successfully",
      error: false,
      success: true,
      data: updatedAddress,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {

    try{

        const userId=req.userId;
        const { _id }= req.body;

        const disableAddress= await AddressModel.updateOne({_id:_id,userId:userId},{status:false});

        return res.json({

            message:"Address deleted successfully",
            error:false,
            success:true,
            data:disableAddress
        });

    }catch(err){

        return res.status(500).json({
            message:err.message || err,
            error:true,
            success:false
        });
    }
};
