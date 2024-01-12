const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter descripation"]
    },
    price:{
        type: Number,
        required:[true,"Please enter Price"],
        maxLenght:[8,"Plese cant't exceed 8 char"]
    },
    offerprice:{
        type:Number,
        default:0
    },
    shippingcharge:{
        type: Number,
        default: 0
    },
    rating:{
        type: Number,
        default:0
    },
    image:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product Stock"],
        maxLenght:[4,"Plese cant't exceed 4 char"],
        default:1
        
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
              type:mongoose.Schema.ObjectId,
              role:"user",
              required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createAT:{
        type:Date,
        default:Date.now
    }
   

})
module.exports = mongoose.model("products",productSchema)