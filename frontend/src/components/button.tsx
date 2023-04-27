
// Button component
// title은 string 유형의 타이틀을 받는다.
// handleClick은 void를 반환하는 함수
// type은 "button" | "submit" | "reset" 유형의 타입을 받는다.
// className은 string 유형의 클래스 이름을 받는다.
// ...rest는 나머지 속성을 받는다.
export const Button = ({
  title,
  handleClick,
  type,
  className,
  ...rest
}: {
  title: string;
  handleClick?: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
  [key: string]: unknown;
}) => {
  return (
    <button
      {...rest}
      onClick={handleClick}
      type={type ? type : "button"}
      className={`${className}`}
    >
      {title}
    </button>
  );
};
