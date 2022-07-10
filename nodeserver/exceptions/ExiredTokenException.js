/**
 * @filename  : ExiredTokenException.js
 * @author    : 정한슬 (seul5106@gmail.com)
 * @description : 토큰이 만료된 419에러를 확장하기 위한 모듈
 **/
 class ExiredTokenException extends Error {
    constructor(msg = "만료된 토큰입니다.") {
        super(msg);
        this._statusCode = 419;
    }

    get statusCode() {
        return this._statusCode;
    }
}

module.exports = ExiredTokenException;