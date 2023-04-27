import { FormEvent, ReactNode } from "react";

// Form component
// onSubmit은 FormEvent<HTMLFormElement> 유형의 이벤트를 받고 void를 반환하는 함수
// children은 ReactNode 유형의 자식을 받는다.
// className은 string 유형의 클래스 이름을 받는다.
export const Form = ({
  onSubmit,
  children,
  className,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <form onSubmit={onSubmit} className={`${className}`}>
      {children}
    </form>
  );
};
