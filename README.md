# Qkart-Coupon

1. Endpoint to get all coupons - https://qkart-coupon-backend.herokuapp.com/all-coupons
2. Endpoint to apply coupon on some amount - https://qkart-coupon-backend.herokuapp.com/get-discount
    Accepts 2 query parameters - couponcode and amount 
    example - https://qkart-coupon-backend.herokuapp.com/get-discount?couponcode=NEWYEAR2022&amount=3000
3. Endpoint to create new coupon - https://qkart-coupon-backend.herokuapp.com/create-coupon
    body should contain data in below format 
    example  - for coupon of type flat - 
    {
      "code": "NEWYEAR2022",
      "startdate": "2022-01-01",
      "enddate": "2022-01-14",
      "minimum_amount": 2000,
      "type": "flat",
      "discount_price": 300
    }
  
  example - for coupon of type percentage 
    {
      "code": "NEWYEAR2023",
      "startdate": "2023-01-01",
      "enddate": "2023-01-15",
      "minimum_amount": 1000,
      "type": "percentage",
      "discount_percentage": 15,
      "max_discount_price": 300
    }
