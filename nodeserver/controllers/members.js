/**
 * @filename  : members.js
 * @author    : 정한슬 (seul5106@gmail.com)
 * @description : members 테이블
 **/

const config = require('../helper/_config');
const logger = require('../helper/LogHelper');
const regexHelper = require("../helper/regex_helper");
const BadRequestException = require('../exceptions/BadRequestException')
const router = require('express').Router();
const mysql2 = require('mysql2/promise');
const util = require("../helper/UtillHelper");
const jwt = require('jsonwebtoken');

const { auth } = require('../authMiddleware');

require('dotenv').config();

module.exports = (app) => {
    let dbcon = null;

    //회원가입에 대한 처리
    router.post("/members/signin", async (req, res, next) => {
        const memberId = req.post("member_id");
        const memberEmail = req.post("member_email");
        const memberPw = req.post("member_pw");
        const memberName = req.post("member_name");
        const memberPhone = req.post("member_phone");
        const memberPostcode = req.post("member_postcode");
        const memberAddr1 = req.post("member_addr1");
        const memberAddr2 = req.post("member_addr2");
        const memberBirth = req.post("member_birth");

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql1 = "SELECT count(*) as cnt FROM members WHERE user_id=?";
            let arg1 = [memberId];

            const [result1] = await dbcon.query(sql1, arg1);
            const totalCount = result1[0].cnt;

            if (totalCount > 0) {
                throw new BadRequestException("이미 사용중인 아이디 입니다.");
            }

            let sql = "INSERT INTO members (";
            sql += "user_id, user_email, user_password, user_name, user_tel, user_postcode, user_addr1, user_addr2, ";
            sql += "user_birth, is_admin, reg_date, is_out";
            sql += ") VALUE (";
            sql += "?,?,?,?,?,?,?,?,?,'N',now(),'N');";

            const args = [memberId, memberEmail, memberPw, memberName, memberPhone, memberPostcode, memberAddr1, memberAddr2, memberBirth];

            await dbcon.query(sql, args);
        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        // const receiver = `${memberName} <${memberEmail}>`;
        // const subject = `${memberName}님의 회원가입을 환영합니다.`;
        // const html = `<p><strong>${memberName}</strong>님, 회원가입해 주셔서 감사합니다.</p><p>앞으로 많은 이용 바랍니다.</p>`;

        res.sendJson({ "item": json });

    });

    //회원 로그인
    router.post("/members/login", async (req, res, next) => {
        const memberId = req.post("member_id");
        const memberPw = req.post("member_pw");

        try {
            regexHelper.value(memberId, "아이디를 입력하세요");
            regexHelper.value(memberPw, "비밀번호를 입력하세요");
        } catch (e) {
            return next(e);
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql = "SELECT id, user_id, user_email, user_password, user_name, user_tel, user_postcode, user_addr1, user_addr2, ";
            sql += "user_birth, is_admin, reg_date, is_out ";
            sql += "FROM members WHERE user_id =? AND user_password =?"
            let args1 = [memberId, memberPw];

            const [result] = await dbcon.query(sql, args1);

            json = result;

            // login_date값을 now()로 update 처리(json데이터는 result가 가져가는게 맞다.) reg_date값이 없다아
            /* let sql2 = "UPDATE members SET login_date=now() WHERE id=?";
            dbcon.query(sql2, json[0].id);*/
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        if (json == null || json.length == 0) {
            return next(
                new BadRequestException("아이디나 비밀번호가 잘못되었습니다.")
            );
        }
        const secret = process.env.SECRET_KEY;

        if (json[0].is_admin == "Y") {
            //JWT token 생성 후 관리자인지 확인하는 데이터를 넘긴다
            const token = jwt.sign({
                type: 'JWT',
                memberId: memberId,
                isAdmin: "Y"
            }, secret, {
                expiresIn: '15m', // 만료시간 15분
                issuer: '토큰발급자',
            });
            res.sendJson({ code: 200, message: "토큰이 발급되었습니다.", token: token });
        } else if (json[0].is_admin == "N") {
            //JWT token 생성
            const token = jwt.sign({
                type: 'JWT',
                memberId: memberId,
            }, secret, {
                expiresIn: '15m', // 만료시간 15분
                issuer: '토큰발급자',
            });
            res.sendJson({ code: 200, message: "토큰이 발급되었습니다.", token: token });
        }
    });

    //서버에 저장되어있는 세션데이터를 비교
    router.post("/readToken", auth, (req, res) => {
        const memberId = req.decoded.memberId
        logger.warn(memberId)
        res.sendJson({ memberId: memberId })
    });

    //관리자인지 아닌지 판단하는 요청
    router.post("/adminAuth", auth, (req, res, next) => {
        const isadmin = req.decoded.isAdmin
        res.sendJson({ isAdmin: isadmin })
    });

    //Profile.js 컴포넌트에서의 회원검색요청 & 예약한 시간 조회
    router.post("/members/get", auth, async(req, res, next) => {
        const memberId = req.decoded.memberId
        let json1 = null;
        let json2 = null;
        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql1 = "SELECT user_id, user_email, user_password, user_name, user_tel, user_postcode, user_addr1, user_addr2, ";
            sql1 += "user_birth, is_admin, reg_date, is_out ";
            sql1 += "FROM members WHERE user_id =?"
            let args1 = [memberId];

            const [result1] = await dbcon.query(sql1, args1);
            json1 = result1;
            
            let sql2 = "SELECT ";
            sql2 += "reserve_date, reserve_time, reserve_headcount, reserve_cancel ";
            sql2 += "FROM members_reserve WHERE user_id=?"
            let args2 = [memberId];

            const [result2] = await dbcon.query(sql2, args2);
            json2 = result2;

        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        res.sendJson({info: json1, reserve: json2})
    })

    return router;
}
