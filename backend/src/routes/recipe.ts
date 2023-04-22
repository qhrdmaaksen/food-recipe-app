import { Router } from "express";
import { validate } from "../middlewares";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  searchRecipeSchema,
} from "../schema-validations";
import passport from "passport";
import {
  createRecipe,
  getAllRecipes,
  getRecipe,
  searchRecipe,
} from "../controllers";
import { getUserRecipes } from "../controllers/recipe";

// 라우터 설정
const router = Router();

/* POST MAN TEST
router.post("/join");*/

/*
* 라우터에 미들웨어를 연결해 스키마 유효성 검사를 수행하고, 유효성 검사를 통과하면 다음 미들웨어를 실행시킴
* 라우터에 미들웨어를 연결해 passport.authenticate() 메서드를 사용해 jwt 토큰을 검사하고, 토큰이 유효하면 다음 미들웨어를 실행시킴
* 라우터에 미들웨어를 연결해 컨트롤러 함수를 실행시킴
* 로그인하지 않으면 아래와 같은 정보에 접근할수 없게 경로를 보호했음
* */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.get(
  "/find",
  passport.authenticate("jwt", { session: false }),
  validate(searchRecipeSchema),
  searchRecipe
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  validate(createRecipeSchema),
  createRecipe
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  validate(getUserRecipesSchema),
  getUserRecipes
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validate(getRecipeSchema),
  getRecipe
);

export { router };
