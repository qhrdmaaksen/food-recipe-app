import { Router } from "express";
import { validate } from "../middlewares";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  searchRecipeSchema,
} from "../schema-validations";
import { getAllRecipes, getRecipe, searchRecipe } from "../controllers";
import { getUserRecipes } from "../controllers/recipe";

// 라우터 설정
const router = Router();

/* POST MAN TEST
router.post("/join");*/

// 라우터에 미들웨어를 연결해 스키마 유효성 검사를 수행하고, 유효성 검사를 통과하면 다음 미들웨어를 실행시킴
router.get("/", getAllRecipes);
router.get("/find", validate(searchRecipeSchema), searchRecipe);
router.post("/create", validate(createRecipeSchema));
router.get("/user/:userId", validate(getUserRecipesSchema), getUserRecipes);
router.get("/:id", validate(getRecipeSchema), getRecipe);

export { router };
