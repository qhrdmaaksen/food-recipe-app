import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStatic } from "passport";
import { User } from "../model";

/*
 * options 에는 jwtFromRequest 와 secretOrKey 가 있음
 * jwtFromRequest 는 토큰을 추출하는 방법을 정의
 * */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

/*
* passport.use() 메서드를 사용하여 전략을 등록
* 전략은 인증을 수행하는 방법을 정의
* 여기서는 JWT 토큰을 사용하여 인증을 수행
* PassportStatic: 정적 비밀번호 유형을 지정
* */
export const authenticate = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user?._id);
        }
        return done(null, false);
      } catch (err) {
        console.log("인증 과정에서 발생한 에러 : ", err);
      }
    })
  );
};
