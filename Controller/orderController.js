const Order = require('../Models/orderModel');
const Product = require('../Models/productmodel');

exports.newOrder = async(req,resp)=>{
    try{
        const {shippingInfo,orderItem,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}= req.body;
        const order = await Order.create({
            shippingInfo,orderItem,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
            user:req.userData.id,
            paidAt:Date.now(),
            

        })
        resp.status(200).json({
            success:true,
            order
           })
        
    }
    catch (error) {
        console.error("Error creating order:", error);
        resp.status(400).json({
            success: false,
            message: error.message 
        });
    }
};
exports.getSingleOrder = async (req, resp) => {
    try {
        const orderId = req.params.id.trim();
        const order = await Order.findById(orderId).populate('user', 'name email');

        if (!order) {
            return resp.status(404).json({
                success: false,
                message: 'No order found',
            });
        }

        resp.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getSingleOrderByadmin = async (req, resp) => {
    try {
        const orderId = req.params.id.trim();
        const order = await Order.findById(orderId).populate('user', 'name email');

        if (!order) {
            return resp.status(404).json({
                success: false,
                message: 'No order found',
            });
        }

        resp.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.allOrdersByAdmin = async (req, resp) => {
    try {
       

        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "No Orders Found for the User",
            });
        }
        



        resp.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.myOrders = async (req, resp) => {
    try {
       

        const orders = await Order.find({ user: req.userData._id});

        if (!orders || orders.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "No Orders Found for the User",
            });
        }

        resp.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        resp.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
