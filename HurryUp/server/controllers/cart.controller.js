import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Product already in cart",
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      productId: productId,
      userId: userId,
    });

    const save = await cartItem.save();

    const updateUserCart = await UserModel.updateOne(
      { _id: userId },
      { $push: { shopping_cart: productId } },
    );

    return res.json({
      data: save,
      message: "Product added to cart",
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

export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItem = await CartProductModel.find({ userId: userId }).populate(
      "productId",
    );

    return res.json({
      data: cartItem,
      message: "List of all products in cart",
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

export const updateCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;

    if (!_id || !qty) {
      return res.status(402).json({
        message: "Product Id and quantity is required",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      { quantity: qty },
    );

    return res.json({
      message: "Cart item updated successfully",
      data: updateCartItem,
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

export const deleteCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    return res.json({
      message: "Cart item deleted successfully",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
