import { Request, Response } from "express";
import { User } from "../models"

// 데이터 베이스에 등록된 유저 정보를 가져오는 함수
export const registerOrLogin = async (req: Request, res: Response) => {
  // 클라이언트에게 전달할 데이터
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // 데이터 베이스에 등록된 유저 정보 가져오기
    const _user = await User.findOne({email}).select("+password").exec()

    if (_user) {

    }

  } catch (error) {}

  return res.send("YEAH, you joined");
};
