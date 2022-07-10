const jwt = require('jsonwebtoken');
const logger = require('./helper/LogHelper');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const InvalidTokenException = require('./exceptions/InvalidTokenException')
const ExiredTokenException = require('./exceptions/ExiredTokenException')

exports.auth = (req, res, next) => {

    // 인증 완료
    try {
        // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
        req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
        return next();
    }
    // 인증 실패
    catch (error) {
        
        // 유효시간이 초과된 경우
        if (error.name === 'TokenExpiredError') {
            throw new ExiredTokenException("만료된 토큰입니다.")
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === 'JsonWebTokenError') {
            throw new InvalidTokenException("유효하지않은 토큰입니다.")
        }
    }
}