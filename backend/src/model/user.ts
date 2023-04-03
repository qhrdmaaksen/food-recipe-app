import { Schema, model, models, Model } from "mongoose";

// User 타입 정의
export interface IUser {
  _id?: string;
  email: string;
  password: string;
}

// User 스키마 정의
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true, // 이메일은 필수값이므로 required: true
      unique: true, // 이메일은 중복되면 안되므로 unique: true
      lowercase: true, // 이메일은 소문자로 저장되어야 하므로 lowercase: true
      index: true, // 이메일은 검색이 자주 일어나므로 index: true
    },
    password: {
      type: String,
      required: true, // 비밀번호는 필수값이므로 required: true
      select: false, // 비밀번호는 조회되지 않도록 select: false
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 필드를 자동으로 생성
    autoIndex: true, // 스키마가 컴파일되면 자동으로 인덱스를 생성
    toJSON: {
      // toJSON, toObject 옵션은 스키마를 JSON 으로 변환할 때 어떤 값들을 포함할지 설정
      virtuals: true, // virtuals 옵션을 true 로 설정하면 toJSON, toObject 옵션에 따라 가상 필드가 포함됨
    },
    toObject: { virtuals: true },
  }
);

// User 모델 생성
export const User =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
