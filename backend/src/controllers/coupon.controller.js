const {getAllCouponsFromdb , getCouponByCode , addNewCoupon} = require("../services/coupon.service.js");

// calculates discount applicable based on amount , type of coupon and responds with discount applicable 
const getCouponDiscount = (req,res,next) => {
    console.log("Get discount");
    let discountAmount = 0;
    if(req.body.couponDetails.type === "flat"){
        discountAmount = req.body.couponDetails.discount_price;
    }else{
        let percDiscAmount = (req.query.amount / 100) * req.body.couponDetails.discount_percentage;
        let maxDiscountAmount = req.body.couponDetails.max_discount_price;
        discountAmount = (percDiscAmount>maxDiscountAmount) ? maxDiscountAmount: percDiscAmount;
    }

    return res.status(200).send({
        "message":"Coupon can be applied",
        "discount_amount": discountAmount
    });
}

// responds with all the coupons available in DB
const getAllCoupons = (req,res,next) => {
    let response = getAllCouponsFromdb();
    return res.json(response);
}

const createCoupon = (req,res,next)=> {
    console.log("in controller");
    let couponDetails = getCouponByCode(req.body.code);
    // checks if given coupon code  presnt in db , if not then error message is returned
    if (couponDetails !== -1) {
        return res.status(403).send({
            "error": "Coupon Code already exists"
        });
    }
    let newCoupon;
    if(req.body.type === "flat"){
        newCoupon = {
            "code" : req.body.code,
            "startdate" : req.body.startdate,
            "enddate":req.body.enddate,
            "minimum_amount":req.body.minimum_amount,
            "type":req.body.type,
            "discount_price":req.body.discount_price
        }
    }else if(req.body.type === "percentage"){
        newCoupon = {
            "code" : req.body.code,
            "startdate" : req.body.startdate,
            "enddate":req.body.enddate,
            "minimum_amount":req.body.minimum_amount,
            "type":req.body.type,
            "discount_percentage":req.body.discount_percentage,
            "max_discount_price": req.body.max_discount_price
        }
    }

    if(addNewCoupon(newCoupon)){
        res.status(200).send({
            "message":"Coupon Created"
        });
    }else{
        res.status(500).send({
            "error":"Inteenal Server Error"
        });
    }
    
}

module.exports = {getCouponDiscount,getAllCoupons,createCoupon};