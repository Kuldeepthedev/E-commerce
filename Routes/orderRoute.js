const express = require("express");
const { requireAuth, checkUser, checkAdmin } = require("../Middleware/authMiddleware");
const { newOrder, getSingleOrder, myOrders, allOrdersByAdmin, getSingleOrderByadmin } = require("../Controller/orderController");
const Router = express.Router();

Router.route("/order/new").post(requireAuth,checkUser,newOrder)
Router.route("/order/myorders").get(requireAuth,checkUser,myOrders)
Router.route("/order/:id").get(requireAuth,checkUser,getSingleOrder)
Router.route("/order/admin/allorders").get(requireAuth,checkUser,checkAdmin,allOrdersByAdmin)
Router.route("/order/admin/:id").get(requireAuth,checkUser,checkAdmin,getSingleOrderByadmin)



module.exports = Router