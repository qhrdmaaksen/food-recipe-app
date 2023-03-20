// 유효성 미들웨어 내보내기

// NextFunction 은 다음 미들웨어를 실행시켜주는 함수
import { NextFunction, Request, Response } from "express";
// InferType 은 yup 의 타입을 추론해주는 함수
import { InferType } from "yup";

// 요청 데이터의 유효성을 검사하는 미들웨어
export const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        ...(req?.body && { body: req.body }),
        ...(req?.query && { query: req.query }),
        ...(req?.params && { params: req.params }),
      });
      return next();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
