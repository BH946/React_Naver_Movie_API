const router = require("express").Router()
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken") // 토큰 체크 함수


// UPDATE - 관리자 or 자기자신
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
    // 만약 비번 update 할수 있기 때문에 아래 if문 추가 및 암호화
    if (req.body.password) { 
        // 암호화
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // id 찾기
            {
                $set: req.body // body 업데이트(id, pw... 전부 update)
            },
            { new: true}
        );
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(500).json(err);
    }
})

// DELETE - 관리자 or 자기자신
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

// GET USER - 관리자만 사용가능
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { password, ...others} = user._doc; // password뺀 내용만 json으로 보내려는것
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

// GET ALL USER - 관리자만 사용가능
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    // 개수 제한 기능 추가(5)
    const query = req.query.new; // url에 ?new=true같이 보냈으면 new값 반환
    try{
        const users = query
        ? await User.find().sort({ _id : -1}).limit(5)
        : await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})

// GET USER STATS - 관리자만 사용가능(매월 합계 구해줌)
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1))

    try{
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear}}}, // lastYear 이후 데이터
            {
                $project: { // 프로젝션인가
                    month: { $month: "$createdAt"} // db에 createdAt의 월을 month에 할당
                }
            },
            {
                $group: { // 이부분이 출력됨
                    _id: "$month", // 위에서 구한 month로 project된 db의 월을 의미
                    total: { $sum:1 } // 1의 의미는 여기서 구한 값 전부 합계하란 의미
                }
            }
        ])
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
})



module.exports = router