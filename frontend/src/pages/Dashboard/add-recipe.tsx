import { useNavigate } from "react-router-dom";
import { useRecipe } from "../../hooks";
import { FormEvent, useState, DragEvent } from "react";
import { IRECIPE } from "../../@types";
import { Button, Form, Input, TextArea } from "../../components";
import { ImageUploader } from "./common";
import cogoToast from "cogo-toast";
import { validateImageType } from "../../utils";

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

    if (!image) {
      return cogoToast.error("이미지를 추가해주세요.");
    }
    if (!state?.title || !state?.description || !state.ingredients) {
      return cogoToast.error("제목, 설명, 재료는 필수 입력사항입니다.");
    }
    // payload 는 이전 state 에 image 를 추가한 객체
    const payload = {
      ...state,
      image,
    };
    // addRecipe 함수를 실행하고 결과를 받아옴
    await addRecipe(payload);
    // state 를 초기화
    setState({ title: "", note: "", description: "", ingredients: "" });
    setImage(null);
    // 페이지 이동
    navigate("/dashboard/myrecipes");
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
    e.preventDefault();
  };

  // handleOnDrop 은 이미지 파일을 가져오는 역할을 합니다.
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    // 브라우저가 이미지를 열지 못하도록 방지
    e.preventDefault();
    // stopPropagation 을 사용하여 부모로 이벤트가 전파되지 않도록 합니다.
    e.stopPropagation();
    // 이미지 파일을 가져오기
    let imageFile = e.dataTransfer.files[0];
    // 이미지 파일 타입이 아니면 에러 메시지를 표시합니다.
    if (!validateImageType(imageFile)) {
      return cogoToast.error("파일 형식이 잘못되었습니다." + imageFile.type);
    }
    // 이미지 파일을 state 에 넣어줍니다.
    setImage(imageFile);
  };

  // handleFile 은 input 에서 파일을 가져오는 역할을 합니다.
  const handleFile = (e: FormEvent<HTMLInputElement>) => {
    // 현재 타겟의 파일이 없으면 return
    if (!e.currentTarget.files) return;
    // 현재 타겟의 파일을 imageFile 에 넣어줍니다.
    const imageFile = e.currentTarget.files[0];
    // 이미지 파일 타입이 아니면 에러 메시지를 표시합니다.
    if (!validateImageType(imageFile)) {
      return cogoToast.warn("파일 형식이 잘못되었습니다." + imageFile.type);
    }
    setImage(imageFile);
  };

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
