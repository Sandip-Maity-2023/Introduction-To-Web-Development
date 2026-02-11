
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product", 
    },
    quantity:{
        type:Number,
        default:1
    },
    usserId:{
        type: mongoose.Schema.ObjectId,
        ref: "User", 
    }
},{timestamps:true}
)

const CartProductModel = mongoose.model("cartProduct", productSchema);

export default CartProductModel;




















