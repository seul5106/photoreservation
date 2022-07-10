/**
 * @filename  : app.js
 * @author    : 정한슬 (seul5106@gmail.com)
 * @description : node의 앱 기본 설정
 **/
const config = require('./helper/_config');
const logger = require('./helper/LogHelper');
const util = require("./helper/UtillHelper");
const fileHelper = require('./helper/FileHelper');
const webHelper = require('./helper/WebHelper');

const url = require("url");
const path = require("path");
const cors = require('cors');

const express = require("express");
const useragent = require("express-useragent");
const static = require("serve-static");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

var ExpressMysqlSession = require("express-mysql-session")(expressSession);
const multer = require("multer"); 

const BadRequestException = require('./exceptions/BadRequestException');
const RuntimeException = require('./exceptions/RuntimeException');
const PageNotFoundException = require('./exceptions/PageNotFoundException');
const ExiredTokenException = require('./exceptions/ExiredTokenException');
const InvalidTokenException = require("./exceptions/InvalidTokenException")

const app = express();
    
app.use(useragent.express());
app.use((req, res, next) => {
    logger.debug("클라이언트가 접속했습니다.");

    const beginTime = Date.now(); //클라이언트가 접속한 시간

    //클라이언트의 IP주소
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    //클라이언트의 장치 정보 기록(UserAgent사용)
    logger.debug("[client]" + ip + "/" + req.useragent.os + "/" + req.useragent.browser + "(" + req.useragent.version + ") / " + req.useragent.platform);

    const current_url = url.format({ //클라이언트가 요청한 페이지URL
        protocol: req.protocol, //프로토콜
        host: req.get("host"), //호스트 ip
        port: req.port, //포트번호
        pathname: req.originalUrl, //경로
    });

    logger.debug("[" + req.method + "]" + decodeURIComponent(current_url));

    res.on("finish", () => { //클라이언트의 접속이 종료됬을때의 이벤트
        const endTime = Date.now(); //클라이언트가 종료한 시간
        const time = endTime - beginTime; //백엔드가 실행하는대 걸린 시간
        logger.debug("클라이언트의 접속이 종료되었습니다. ::: [runtime]" + time + "ms");
        logger.debug("-------------------------------------------------");
    });
    next(); // 여기서의 콜백함수를 종료하고 요청 URL에 연결된 기능으로 제어를 넘겨준다.
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

app.use(cookieParser(config.secure.cookie_encrypt_key));

app.use(
    expressSession({
        secret: config.secure.cookie_encrypt_key,
        resave: false,
        saveUninitialized: true,
        cookie : {
            httpOnly : true,
            sameSite : 'none',
            maxAge : 5300000,
            secure : true,
        },
        store: new ExpressMysqlSession(config.database)
    })
);

app.use(webHelper());

app.use("/", static(config.public_path));
app.use("/upload", static(config.upload.dir));
app.use("/thumb", static(config.thumbnail.dir));
app.use(favicon(config.favicon_path));

const router = express.Router();

// cors 미들웨어를 삽입합니다. + 프론트에서 세션을 유지시키기 위한 옵션추가 https://studioplug.tistory.com/373
app.use(cors({origin : true, credentials : true})); 
app.use("/", router);

//라우터
app.use(require('./controllers/members')(app)); //회원테이블
app.use(require('./controllers/reservation')(app)); // 예약테이블

app.use((err, req, res, next) => {
    if (err instanceof BadRequestException) {
        res.sendError(err);
    } else if (err instanceof ExiredTokenException) {
        res.sendError(err);
    } else if (err instanceof InvalidTokenException) {
        res.sendError(err);
    } else {
        res.sendError(new RuntimeException(err.message));
    }
});

app.use("*", (req, res, next) => {
    const err = new PageNotFoundException();
    res.sendError(err);
});


const ip = util.myip();

app.listen(config.server_port, () => {
    logger.debug("------------------------------------------");
    logger.debug("|           Start Express Server         |");
    logger.debug("------------------------------------------");

    ip.forEach((v, i) => {
        logger.debug("server address => http://" + v + ":" + config.server_port);
    })

    logger.debug("------------------------------------------");
});