import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "mongoose";
import { authRouter, recipeRouter } from "./routes";

// 익스프레스 에플리케이션 생성
const app: Application = express();

// 미들웨어 설정
// express.json() 미들웨어는 application/json 형식의 데이터를 분석하여 req.body 객체로 만들어준다.
app.use(express.json());
// express.urlencoded() 미들웨어는 application/x-www-form-urlencoded 형식의 데이터를 분석하여 req.body 객체로 만들어준다.
// extended: true 옵션을 주면 qs 모듈을 사용하고, false 옵션을 주면 querystring 모듈을 사용한다.
// qs 모듈은 내장 모듈이 아니므로 따로 설치해야 한다.
app.use(express.urlencoded({ extended: true }));
// cors 미들웨어는 클라이언트에서 요청을 보낼 때 CORS(Cross-Origin Resource Sharing) 관련 설정을 할 수 있게 해준다.
app.use(cors());
// helmet 미들웨어는 애플리케이션의 보안을 강화해준다.
app.use(helmet());

const PORT = (process.env.PORT as unknown as number) || 5000;

// 라우터 설정
/* routes folder 에서 별칭 authRouter, recipeRouter 로 내보낸걸 가져와 설정함*/
app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

// 404 에러 처리
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "요청하신 페이지를 찾을 수 없습니다.",
  });
});

// DB 연결 함수
const runDB = async () => {
  connect(process.env.MONGODB_URI as string)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch(() => console.log("MongoDB 연결 실패"));
};

runDB();

// port 를 얻을 때마다 호출할 함수를 전달
app.listen(PORT, () => {
  console.log(`현재 실행되고있는 서버의 포트 넘버: ${PORT}`);
});
