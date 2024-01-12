const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, createProductReview, getProductDetails } = require('../Controller/productController');
const { requireAuth, checkAdmin, checkUser} = require('../Middleware/authMiddleware');



const Router = express.Router();

Router.route("/products").get(getAllproducts);
Router.route("/products/addnew").post(requireAuth,checkAdmin,createProduct);
Router.route("/products/:id").put(requireAuth,checkAdmin,updateProduct).delete(requireAuth,checkAdmin,deleteProduct);
Router.route("/review").post(requireAuth,createProductReview);
Router.route("/products/:id").get(getProductDetails);



module.exports = Router;