const jwt = require("jsonwebtoken")

// 회원 인증
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token; // 보통 헤더에 토큰
    if (authHeader) {
        const token = authHeader.split(" ")[1] // 토큰에 무기명 토큰.. 이렇게 보냈음
        jwt.verify(token, process.env.JWT_SEC, (err,user) =>{
            if(err) res.status(401).json("Token is not valid!") // 토큰 유효하지 않은경우 - 2번경우
            req.user = user; // req에 user를 새로 추가해서 데이터 넣은것
            next()
        })
    }else { // 인증 실패~~(헤더에 토큰 업는경우) - 1번경우
        return res.status(401).json("You are not authenticated!")
    }
}

// 관리자 or 자기자신 인증
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => { // next함수 부분이다.
        // (url로 보낸)요청한id === 토큰에서 얻은id or 관리자면 통과!
        if (req.user.id === req.params.id || req.user.isAdmin) { // url로 보낸건 params로 접근가능
            next(); // 여기 next는 내용이 없지만 send()나 end()처럼 이걸해야 끝맺는듯.
        } else {
            res.status(403).json("You are not alowed to do that!"); // - 3번경우
        }
    })
}

// 관리자 인증
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}