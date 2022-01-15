

const validateCoupon = (req,res,next) => {
    console.log("In validate Coupon");
    next();
}

module.exports = {validateCoupon};