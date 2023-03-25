/*스키마 발리데이션스 내부에서 로그인 및 등록에 필요한(이메일,패스워드)검증*/
import * as yup from "yup";

// 레시피 등록 유효성 검사 스키마
const createRecipeSchema: yup.AnyObjectSchema = yup.object({
  body: yup.object({
    title: yup.string().required("title is required"),
    note: yup.string(),
    ingredients: yup.string().required("ingredients is required"),
    description: yup.string().required("description is required"),
  }),
});

// 단일 레시피 조회 유효성 검사 스키마
const getRecipeSchema = yup.object({
  params: yup.object({

    id: yup.string().min(24).required("invalid request"),
  }),
});

// 레시피 검색 유효성 검사 스키마
const searchRecipeSchema = yup.object({

  query: yup.object({
    q: yup.string().required("invalid request"),
  }),
});

// 사용자 레시피 조회 유효성 검사 스키마
const getUserRecipesSchema = yup.object({
  params: yup.object({
    userId: yup.string().min(24).required("invalid request"),
  }),
});

//register or login 유효성 검사 스키마
const joinSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
        .string()
        .min(7, "password must be greater than 6")
        .required("Password is required"),
  }),
});

export {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
  searchRecipeSchema,
};
