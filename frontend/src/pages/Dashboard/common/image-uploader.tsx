import React, { FormEvent, DragEvent } from "react";
import { Input } from "../../../components";

// image drag and drop
export const ImageUploader = ({
  handleDragOver,
  handleOnDrop,
  handleFile,
  className,
  name,
}: {
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleOnDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleFile: (event: FormEvent<HTMLInputElement>) => void;
  className: string;
  name: string;
}) => {
  return (
    <div className={`${className}`}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        className="flex flex-col items-center justify-between p-41"
      >
        <p className="font-light text-lg">이미지 추가</p>
        <p>이미지를 여기로 옮기기</p>
        <p>or</p>
        <label
          className="font-light text-lg text-orange-500 hover:cursor-pointer"
          htmlFor-="file"
        >
          파일 선택
        </label>
        <Input
          id="file"
          placeholder="File"
          type="file"
          accept="image/*"
          className="hidden"
          handleChange={handleFile}
        />
        {name && (
          <p className="text-white p-2 font-light underline underline-offset-4">
            {name} 추가되었습니다.
          </p>
        )}
      </div>
    </div>
  );
};
