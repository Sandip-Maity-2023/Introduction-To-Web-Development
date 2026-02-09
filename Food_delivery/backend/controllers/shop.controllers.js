import Shop from "../models/shop.model.js";
import uploadedOnCloudinary from "../utils/cloudinary.js";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadedOnCloudinary(req.file.path);
    }
let shop=await Shop.findOne({owner:req.userId})
if(!shop){
    shop = await Shop.create({
      name,
      city,
      state,
      address,
      image,
      owner: req.userId,
    });
}else{
    shop=await Shop.findByIdAndUpdate(shop._id,{
        name,
      city,
      state,
      address,
      image,
      owner: req.userId,
    },{new:true})
}
    await shop.populate("owner");
    return res.status(201).json(shop);
  } catch (err) {
    return res.status(500).json({ message: `create shop error ${err}` });
  }
};

// export const editShop = async (req, res) => {
//   try {
//     const { name, city, state, address } = req.body;
//     let image;
//     if (req.file) {
//       image = await uploadedOnCloudinary(req.file.path);
//     }
//     const shop = awaitShop.create({
//       name,
//       city,
//       state,
//       address,
//       image,
//       owner: req.userId,
//     });
//   } catch (err) {


//   }
// };
