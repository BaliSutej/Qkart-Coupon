const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const { validateCoupon } = require('./validations/coupon.validation.js');
const { getCouponDiscount , getAllCoupons} = require('./controllers/coupon.controller.js');

// enable cors 
app.use(cors());
// parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/",function(req,res,next){
//     console.log("Hey in Get");
//     return res.send({"hi":"hi"});
// });

app.get("/getdiscount",validateCoupon,getCouponDiscount);

app.get("/all-coupons",getAllCoupons);

app.use((req, res, next) => {
    console.log("Hey There !");
    res.statusCode = 404;
    res.send({ "error": "Not Found" });
});


// app.listen(8081,function(){
//     console.log("Application running on 8081");
// });


module.exports = app;


