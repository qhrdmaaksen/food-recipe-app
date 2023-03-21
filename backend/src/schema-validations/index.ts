/*스키마 발리데이션스 내부에서 로그인 및 등록에 필요한(이메일,패스워드)검증*/
import * as yup from "yup";

// 등록 또는 로그인
const joinSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("이메일은 필수값입니다."),
    password: yup
      .string()
      .min(7, "비밀번호는 7자 이상입니다.")
      .required("비밀번호는 필수값입니다."),
  }),
});

export { joinSchema };
