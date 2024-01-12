const Product = require('../Models/productmodel');
const Apifeatures = require('../utils/apifeaturs');

exports.createProduct = async (req, resp) => {
    try{
    const product = await Product.create(req.body);
    resp.status(200).json({
        success: true,
        product
    });
}
catch{
    resp.status(501).json({
        success: false,
        message: "Require admin login first"
    })
}
};
exports.updateProduct = async(req,resp)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        resp.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
     product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
     })
     resp.status(200).json({
        success:true,
        product
     })
};
exports.deleteProduct = async (req, resp) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return resp.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id, {
            useFindAndModify: false
        });

        resp.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        resp.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.getAllproducts = async (req, resp) => {
    const resultParPage = 21;
    const totalProduct = await Product.countDocuments();
    const apiFeatures = new Apifeatures(Product.find(), req.query)
    .search().
    filter().pagination(resultParPage);
    const product = await apiFeatures.query;
    resp.status(200).json({
        message: true,
        product,
        totalProduct,
        resultParPage
    });
};
exports.getProductDetails = async (req, resp) => {
    const product = await Product.find({_id: req.params.id})
    if(product){
        resp.status(200).json({
            success:true,
            message: "Product detail get success",
            product,
        })
    }
        else{
            resp.status(201).json({
                success:false,
                message: "Product detail can't get success"
            })
        }
    
}
exports.createProductReview = async (req, resp) => {
    const { rating, comment, productId, name } = req.body;

    const review = {
        name,
        user:req.userData._id,
        rating: Number(rating),
        comment,
    };

    try {
        const product = await Product.findById(productId);

        if (product) {
            const isReviewed = product.reviews.find((rev) => rev.user === user);

            if (!isReviewed) {
                product.reviews.push(review);
            } else {
                product.reviews.forEach((rev) => {
                    if (rev.user === user) {
                        rev.rating = rating;
                        rev.comment = comment;
                    }
                });
            }

            product.numOfReviews = product.reviews.length;
            let totalRatings = 0;

            product.reviews.forEach((rev) => {
                totalRatings += rev.rating;
            });

            product.rating = totalRatings / product.reviews.length;

            await product.save();

            resp.status(200).json({
                success: true,
                message: "Review submitted successfully",
            });
        } else {
            resp.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        console.error("Error creating product review:", error);
        resp.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
