const { getCouponByCode } = require("../services/coupon.service.js");


// returns datetime at last second of given date
const expireDate = (date) => {
    let prevDate = new Date(date);
    prevDate.setMinutes(59);
    prevDate.setSeconds(59);
    prevDate.setMilliseconds(0);
    prevDate.setHours(23);
    prevDate = prevDate.toLocaleString('en-US');
    return new Date(prevDate);
}

//returns current date time for indian region
const presentDate = () => {
    let todayDateIndia = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    return new Date(todayDateIndia);
}


const validateNewCoupon = (req, res, next) => {
    console.log("Invalidation");

    // Check if code is present
    if(!req.body.code){
        return res.status(404).send({
            "error": "Enter coupon code"
        });
    }

    
    if( req.body.minimum_amount === undefined && ( req.body.minimum_amount != undefined && !Number(req.body.minimum_amount))){
        return res.status(404).send({
            "error": "Invalid or No minimum amount specified"
        });
    }
    
    // handles invalid coupon type
    if (req.body.type === "flat" || req.body.type === "percentage") {

    } else {
        return res.status(404).send({
            "error": "Invalid Coupon Code"
        });
    }
    next();
}


// validations on coupon are handled
const validateCoupon = (req, res, next) => {
    let couponDetails = getCouponByCode(req.query.couponcode);
    // checks if given coupon code  presnt in db , if not then error message is returned
    if (couponDetails === -1) {
        return res.status(404).send({
            "error": "Invalid Coupon Code"
        });
    }

    // checks  if cart amount is less than minimum required amount to apply coupon , if this is true , then error message is returned
    if (req.query.amount < couponDetails.minimum_amount) {
        return res.status(403).send({
            "error": "Coupon is applicable for a minimum cart amount of " + couponDetails.minimum_amount
        });
    }

    // checks if coupon is expired 
    if (expireDate(couponDetails.enddate) - presentDate() < 0) {
        return res.status(403).send({
            "error": "Coupon has been expired"
        });
    }

    req.body.couponDetails = couponDetails;
    next();
}

module.exports = { validateCoupon, validateNewCoupon };