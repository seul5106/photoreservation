/**
 * @filename  : InvalidTokenException.js
 * @author    : 정한슬 (seul5106@gmail.com)
 * @description : 유요하지 않은 토큰 401에러를 확장하기 위한 모듈
 **/
 class InvalidTokenException extends Error {
    constructor(msg = "유효하지않은 로그인 토큰입니다. 다시 로그인해주세요") {
        super(msg);
        this._statusCode = 401;
    }

    get statusCode() {
        return this._statusCode;
    }
}

module.exports = InvalidTokenException;