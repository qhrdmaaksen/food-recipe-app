import { Request, Response } from "express";

// 데이터 베이스에 등록된 유저 정보를 가져오는 함수
export const registerOrLogin = async (req: Request, res: Response) => {
  // 클라이언트에게 전달할 데이터
  return res.send("YEAH, you joined");
};
