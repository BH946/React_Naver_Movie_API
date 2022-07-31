const router = require("express").Router()
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken") // 토큰 체크 함수

// CREATE - 제품은 당연히 관리자만 add 가능
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save(); // db에 적용
        res.status(200).json(savedProduct);
    } catch(err) {
        res.status(500).json(err);
    }
})


// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // id 찾기
            {
                $set: req.body // body 업데이트( 전부 update)
            },
            { new: true}
        );
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(500).json(err);
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// GET PRODUCT - 전체가 보기때문에 토큰 함수 필요X, 제품 검색
router.get("/find/:id", async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})


// GET ALL PRODUCT - 전체 제품에서 쿼리로, new와 카테고리로 분류
router.get("/", async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory){ // db에 타입 : 배열로 이루어져 있음
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        }else {
            products = await Product.find(); // 기본은 모든 제품 가져옴
        }
        
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router