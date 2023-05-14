/*스키마 발리데이션스 내부에서 로그인 및 등록에 필요한(이메일,패스워드)검증*/
import * as yup from "yup";

// 레시피 등록 유효성 검사 스키마
const createRecipeSchema: yup.AnyObjectSchema = yup.object({
  body: yup.object({
    title: yup.string().required("제목이 필요합니다"),
    note: yup.string(),
    ingredients: yup.string().required("재료가 필요합니다"),
    description: yup.string().required("설명이 필요합니다"),
  }),
});

// 단일 레시피 조회 유효성 검사 스키마
const getRecipeSchema = yup.object({
  params: yup.object({
    // 레시피 아이디가 24자리 이상이어야 함
    id: yup.string().min(24).required("잘못된 요청"),
  }),
});

// 레시피 검색 유효성 검사 스키마
const searchRecipeSchema = yup.object({
  // 검색어가 존재해야 함
  query: yup.object({
    q: yup.string().required("잘못된 요청"),
  }),
});

// 유저 레시피 조회 유효성 검사 스키마
const getUserRecipesSchema = yup.object({
  params: yup.object({
    // 사용자 아이디가 24자리 이상이어야 함
    userId: yup.string().min(24).required("잘못된 요청"),
  }),
});

//register or login 유효성 검사 스키마
const joinSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("이메일이 필요합니다"),
    password: yup
      .string()
      .min(7, "암호는 6 자리 이하는 사용할 수 없습니다.")
      .required("비밀번호가 필요합니다"),
  }),
});

export {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
  searchRecipeSchema,
};
