const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowDb(new FileSync("src/database/couponsdb.json"));

// Retrive coupon of specified couponCode from DB and return all its details in object, if coupon with given coupon code not present in db , returns -1
const getCouponByCode = (couponCode) => {
    let allCoupons = db.get("coupons").value();
    let couponDetailsIndex = allCoupons.findIndex((coupon) => {
        return coupon.code === couponCode;
    });
    if (couponDetailsIndex != -1) {
        let couponDetails = allCoupons[couponDetailsIndex];
        return couponDetails;
    }

    return couponDetailsIndex;
}

const getAllCouponsFromdb = () => {
    return db.get("coupons").value();
}


const addNewCoupon = (couponDetails) => {
    let coupons = db.get("coupons");
    coupons.push(couponDetails).write();
    return true;
}

module.exports = { getAllCouponsFromdb, getCouponByCode ,addNewCoupon };