import { Router } from "express";
import { registerOrLogin } from "../controllers";
import { validate } from "../middlewares";
import { joinSchema } from "../schema-validations";

// 라우터 설정
const router = Router();

// controller 함수를 라우터에 연결해 joinSchema 스키마 유효성 이상 없다면 registerOrLogin 함수 실행
router.post("/join", validate(joinSchema), registerOrLogin);

export { router };
