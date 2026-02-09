


import express from "express"
//import { createEditShop } from "../controllers/shop.controllers.js";
//import {getCurrentUser} from "../controllers/user.controllers.js"

import {addItem,editItem} from "../controllers/item.controllers.js"
import {upload,editItem} from "../middlewares/multer.js"
import isAuth from "../middlewares/isAuth.js";


const itemRouter=express.Router()

itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

export default itemRouter