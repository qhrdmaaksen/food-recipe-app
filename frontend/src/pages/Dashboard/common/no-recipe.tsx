import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";

// 레시피가 없는 경우
export const NoRecipe = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/dashboard/addrecipe", { replace: true });
  };
  return (
    <div className="flex items-center justify-center flex-col md:w-[50%] m-auto">
      <h3 className="text-white font-bold text-lg p-4">레시피를 찾을 수 없습니다.</h3>
      <Button
        handleClick={handleNavigate}
        title="레시피 추가"
        className={
          "bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full mb-4"
        }
        type="button"
      />
    </div>
  );
};
