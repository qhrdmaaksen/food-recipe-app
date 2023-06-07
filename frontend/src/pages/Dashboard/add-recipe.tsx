import { useNavigate } from "react-router-dom";
import { useRecipe } from "../../hooks";
import { FormEvent, useState, DragEvent } from "react";
import { IRECIPE } from "../../@types";
import { Button, Form, Input, TextArea } from "../../components";
import {ImageUploader} from "./common";

export const AddRecipe = () => {
  const navigate = useNavigate();
  const { loading, addRecipe } = useRecipe();
  const [state, setState] = useState<IRECIPE>({
    title: "",
    note: "",
    description: "",
    ingredients: "",
  });
  // image 는 파일이기 때문에 null 로 초기화, setImage 는 파일을 받아서 state 에 넣어주는 역할
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // input 에서 onChange 이벤트가 발생했을 때 실행되는 함수
  const onChange = (
    // e.currentTarget 의 타입이 HTMLInputElement 이거나 HTMLFormElement 이기 때문에 타입을 지정해줘야 함
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    // name 과 value 를 가져옴
    const { name, value } = e.currentTarget;
    // state 에 name 을 key 로 value 를 value 로 하는 객체를 ...state 에 넣어줌
    setState({ ...state, [name]: value });
  };

  // 드래그할 수 있도록 부모를 준비한 다음 borwser가 이미지를 열지 못하도록 합니다.
  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleFile = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="text-white">
      <h2 className="font-extrabold text-xl">레시피 추가</h2>
      <Form
        onSubmit={onSubmit}
        className={`mt-3 flex flex-col gap-3 md:flex-row`}
      >
        <div className="w-full">
          <Input
            placeholder="레시피 제목"
            name="title"
            type="text"
            handleChange={onChange}
            disabled={loading}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
          <TextArea
            disabled={loading}
            placeholder="재료"
            name="ingredients"
            onChange={onChange}
            rows={4}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2`}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          {/* 이미지 업로드 (드래그 앤 드롭) */}
          <ImageUploader
            name={image?.name as string}
            handleDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            handleFile={handleFile}
            className={`bg-zinc-900 py-1 px-4 w-full hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
          <TextArea
            disabled={loading}
            placeholder="레시피 설명"
            name="description"
            onChange={onChange}
            rows={6}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
          <Button
            disabled={loading}
            title={loading ? "Publishing..." : "Publish Recipe"}
            className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full mb-4`}
          />
        </div>
      </Form>
    </div>
  );
};
