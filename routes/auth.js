const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// REGISTER(등록)
router.post("/register", async (req, res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    }) // 얻은 값을 DB로 전송해야한다. save()사용

    try {
        const savedUser = await newUser.save(); // Document
        res.status(201).json(savedUser); // json
    } catch( err){
        res.status(500).json(err);
        // err code 500만 설정하겠다.(다양한 나머지 에러들은 일단 무시)
    }
})

// LOGIN(로그인)
router.post("/login", async (req, res) => {
    try{
        // REGISTER된 USER은 어차피 NAME이 1개일테니 findOne() 사용
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials!") // id 못찾으면 401 에러

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC) // 해시된 비번을 원래 비번값으로 변환
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // 비번 형식 utf8

        OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!") // pw 몾찾으면 401 에러
        
        // 다 통과시 로그인 성공이므로 토큰도 생성
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"} // 3일뒤 만료. 즉, 다시 로그인 필요
        );

        // user로 하면 others에 상관없는 다른 소스들도 너무 많아서 user_doc로 지정
        const { password, ...others} = user._doc; // password뺀 내용만 json으로 보내려는것

        res.status(200).json({...others, accessToken})
    }catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router