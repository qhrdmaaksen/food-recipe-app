import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../../components";

export const ErrorPage = () => {
  const navigate = useNavigate();
  // useRouteError 는 react-router-dom의 hook으로, react-router-dom의 버전이 6이상일 때 사용할 수 있다.
  const error: any = useRouteError();
  console.log(error);
  // 새로 고침 버튼을 누르면 / 로 이동한다.
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col bg-zinc-900">
      <h1 className="text-lg font-extrabold text-orange-500">Oops!</h1>
      <p className="text-white">죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <Button
        title="새로고침하려면 클릭하세요."
        handleClick={handleNavigate}
        className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-2 w-[50%]`}
      />
    </div>
  );
};
