import express from "express";
const router=express.Router()

import { authenticate,authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createCategory,updateCategory,deleteCategory,listCategory,readCategory} from "../controllers/categoryControllers.js";

router.route('/').post(authenticate,authorizeAdmin,createCategory)
router.route('/:categoryId').put(authenticate,authorizeAdmin,updateCategory)
router.route('/:categoryId').delete(authenticate,authorizeAdmin,deleteCategory)
router.route('/categories').get(listCategory)
router.route('/:id').get(readCategory)




export default router
