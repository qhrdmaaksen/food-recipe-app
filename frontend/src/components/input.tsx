import { FormEvent } from "react";

// Input component
// type은 string 유형의 타입을 받는다.
// placeholder는 string 유형의 placeholder를 받는다.
// handleChange는 FormEvent<HTMLInputElement> 유형의 이벤트를 받고 void를 반환하는 함수
// className은 string 유형의 클래스 이름을 받는다.
// ...rest는 나머지 속성을 받는다.
export const Input = ({
  type,
  placeholder,
  handleChange,
  className,
  ...rest
}: {
  type: string;
  placeholder: string;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  className: string;
  [key: string]: unknown;
}) => {
  return (
    <input
      {...rest}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className={`${className}`}
    />
  );
};
