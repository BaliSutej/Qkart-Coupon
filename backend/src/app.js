const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const { validateCoupon , validateNewCoupon } = require('./validations/coupon.validation.js');
const { getCouponDiscount , getAllCoupons , createCoupon} = require('./controllers/coupon.controller.js');

// enable cors 
app.use(cors());
// parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/get-discount",validateCoupon,getCouponDiscount);

app.get("/all-coupons",getAllCoupons);

app.post("/create-coupon",validateNewCoupon,createCoupon);

app.use((req, res, next) => {
    res.statusCode = 404;
    res.send({ "error": "Endpoint Not Found" });
});



module.exports = app;


