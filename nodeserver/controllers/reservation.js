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

    //예약요청
    router.post("/doReservation/reserve", auth, async (req, res, next) => {
        const memberId = req.decoded.memberId
        const reserve_date = req.post("reserve_date")
        const reserve_time = req.post("reserve_time")
        const reserve_headcount = req.post("reserve_headcount")

        let json = null;



        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            //백엔드에서도 같은날짜의 같은 시간일 경우 에러발생
            let sql1 = "SELECT count(*) as cnt FROM members_reserve WHERE reserve_date=? AND reserve_time=?";
            let arg1 = [reserve_date, reserve_time];

            const [result1] = await dbcon.query(sql1, arg1);
            const totalCount = result1[0].cnt;

            if (totalCount > 0) {
                throw new BadRequestException("이미 예약되어있는 시간입니다.");
            }
//
            var regex = /[^0-9]/g;
            var getRegex = reserve_headcount.replace(regex, "");
            logger.warn(reserve_headcount)
            logger.warn(getRegex)
            if (reserve_headcount != getRegex) {
               throw new BadRequestException("인원에는 숫자만 입력해주세요!!")
            }


            let sql = "INSERT INTO members_reserve (";
            sql += "reserve_date, reserve_time, reserve_cancel, reserve_headcount, reg_date, user_id ";
            sql += ") VALUE (";
            sql += "?,?,'N',?,now(),?);";
            let args = [reserve_date, reserve_time, reserve_headcount, memberId];
            await dbcon.query(sql, args);

            let sql2 = "SELECT ";
            sql2 += "reserve_date, reserve_time, reserve_headcount ";
            sql2 += "FROM members_reserve WHERE reserve_date=?"
            let args2 = [reserve_date];
            const [result2] = await dbcon.query(sql2, args2);
            json = result2
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        res.sendJson({ data: json })
    })

    //예약 페이지에서의 예약 시간대 확인을 위한요청
    router.get("/doReservation/selectreservation:date", auth, async (req, res, next) => {
        const reserve_date = req.get("date")

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql = "SELECT ";
            sql += "reserve_date, reserve_time, reserve_headcount ";
            sql += "FROM members_reserve WHERE reserve_date=?"
            let args = [reserve_date];

            const [result] = await dbcon.query(sql, args);
            json = result;
            logger.warn(json)
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        res.sendJson({ data: json })
    })

    //예약삭제
    router.post("/doReservation/deleteReserve", auth, async (req, res, next) => {
        const memberId = req.decoded.memberId
        const reserve_date = req.post("reserve_date")
        const reserve_time = req.post("reserve_time")

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql = "DELETE FROM members_reserve WHERE ";
            sql += "user_id = ? AND reserve_date = ? AND reserve_time = ?";
            let args = [memberId, reserve_date, reserve_time];

            const [result] = await dbcon.query(sql, args);
            json = result;
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        res.sendJson({ data: json })
    })


    //관리자에서 예약조회
    //전체회원 조회
    router.get("/admin/reservelist", auth, async (req, res, next) => {

        // 검색어 파라미터 받기 -> 검색어가 없을 경우 전체 목록 조회이므로 유효성 검사 안함
        const query = req.get("query");

        // 현재 페이지 번호 받기(기본값은 1)
        const nowPage = req.get("page", 1);

        // 한 페이지에 보여질 목록 수 받기 (기본값은 10, 최소 10, 최대 30)
        const rows = req.get("rows", 10);

        // 데이터 조회 결과가 저장될 빈 변수
        let json = null;
        let pagenation = null;

        
        if(req.decoded.isAdmin = undefined){
            throw new BadRequestException("관리자가 아닙니다. 관리자로 로그인해주세요")
        }

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql1 = "SELECT count(*) as cnt FROM members_reserve ";

            let args1 = [];

            if (query != null) {
                sql1 += "WHERE user_name LIKE concat('%', ?, '%')";
                args1.push(query);
            }
            const [result1] = await dbcon.query(sql1, args1);
            console.log([result1]);
            const totalCount = result1[0].cnt;

            //페이지번호 정보 계산
            pagenation = util.pagenation(totalCount, nowPage, rows);
            logger.debug(JSON.stringify(pagenation));

            // 데이터 조회
            let sql2 = "SELECT user_id, reserve_date, reserve_time, reserve_cancel, reserve_headcount, reg_date ";
            sql2 += "FROM members_reserve ";

            // SQL문에 설정할 치환값
            let args2 = [];

            if (query != null) {
                sql2 += "WHERE user_name LIKE concat('%', ?, '%')";
                args2.push(query);
            }
            sql2 += " LIMIT ?, ?";
            args2.push(pagenation.offset);
            args2.push(pagenation.listCount);
            
            const [result2] = await dbcon.query(sql2, args2);

            // 조회 결과를 미리 준비한 변수에 저장함
            json = result2;
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }
        res.sendJson({ pagenation: pagenation, item: json });
    })

    return router;
}
