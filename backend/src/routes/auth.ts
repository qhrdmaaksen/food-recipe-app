import { Router } from "express";
import { registerOrLogin } from "../controllers";
import {validate} from "../middlewares";
import {joinSchema} from "../schema-validations";

// 라우터 설정
const router = Router();

// controller 함수를 라우터에 연결해 registerOrLogin 에서 처리된 결과를 클라이언트에게 전달
router.post("/join", validate(joinSchema), registerOrLogin);

export { router };
