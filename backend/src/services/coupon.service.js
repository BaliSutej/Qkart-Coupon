const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowDb(new FileSync("src/database/couponsdb.json"));



console.log(db.get("coupons").value());
const getCouponByCode = (couponCode) => {

}


const getAllCouponsFromdb = () => {
    return db.get("coupons").value();
}


module.exports = {getAllCouponsFromdb,getCouponByCode};