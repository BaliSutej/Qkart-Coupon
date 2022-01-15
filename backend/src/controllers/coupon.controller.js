const {getAllCouponsFromdb,getCouponByCode} = require("../services/coupon.service.js");

const getCouponDiscount = (req,res,next) => {
    console.log("Get discount");
    res.send("Hi");
}

const getAllCoupons = (req,res,next) => {
    let response = getAllCouponsFromdb();
    return res.json(response);
}


module.exports = {getCouponDiscount,getAllCoupons};