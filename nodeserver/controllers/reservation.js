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
            let args = [memberId , reserve_date, reserve_time];

            const [result] = await dbcon.query(sql, args);
            json = result;
        } catch (e) {
            return next(e);
        } finally {
            dbcon.end();
        }

        res.sendJson({ data: json })
    })


    return router;
}
