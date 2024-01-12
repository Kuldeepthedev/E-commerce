const mongoose  = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,"Please provide your shiping address"]
        },
        city:{
            type:String,
            required:[true,"Please provide your shiping address"]
        },
        state:{
            type:String,
            required:[true,"Please provide your shiping address"]
        },
        country:{
            type:String,
            required:[true,"Please provide your shiping address"]
        },
        pinCode:{
            type:Number,
            required:true

        },
        phoneNo:{
            type:Number,
            required:true        }

    },
    orderItem:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user', 
        required: true,
    },
      paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
      },
      paidAt:{
        type:Date,
        required:true
      },
     itemsPrice:{
        type:Number,
        default:0
     },
     taxPrice:{
        type:Number,
        default:0
     },
     shippingPrice:{
        type:Number,
        default:0
     },
     totalPrice:{
        type:Number,
        default:0
     },
     oderStatus:{
        type:String,
        required:true,
        default:"Processing"
     },
     deliveredAt:Date,
     createdAt:{
        type:Date,
        default:Date.now
     },

});

module.exports = mongoose.model("orders",orderSchema)