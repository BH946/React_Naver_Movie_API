const router = require("express").Router()
const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken") // 토큰 체크 함수

// CREATE 
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save(); // db에 적용
        res.status(200).json(savedOrder);
    } catch(err) {
        res.status(500).json(err);
    }
})


// UPDATE - 관리자만 주문을 변경
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, // id 찾기
            {
                $set: req.body // body 업데이트( 전부 update)
            },
            { new: true}
        );
        res.status(200).json(updatedOrder)
    } catch(err) {
        res.status(500).json(err);
    }
})

// DELETE - 관리자만 주문을 삭제
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        // 사용자 여러개 가질수 있기 때문에 findOne이아닌것
        const order = await Order.find({userId: req.params.userId});
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})


// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

// GET MONTHLY INCOM - 수입 확인(관리자만)
// STATS는 매월 데이터 구했다면, INCOM은 지난달과 지지난달 수입 비교위해 데이터 구함
router.get("/income", verifyTokenAndAdmin, async (req, res)=>{
    const productId = req.query.pid; // query.pid는 url의 id부분 의미하는듯
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try{
        const income = await Order.aggregate([
            {   $match: {
                    createdAt: { $gte: previousMonth},
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            }, // 2달 이전부터 이후 데이터 match할것이다.

            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount", // money
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"} // amount
                }
            }
        ])
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router