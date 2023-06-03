import { useState } from "react";
import { IRECIPERESPONSE } from "../@types";
import { AxiosResponse } from "axios";
import { instance } from "../config";

// useRecipe 훅 : 레시피 검색
export const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipe = async (
    q: string
  ): Promise<AxiosResponse<IRECIPERESPONSE[] | []> | any> => {
    try {
      // 검색 시작 시 로딩 상태를 true 로 변경합니다.
      setLoading(true);
      // 검색 결과를 반환합니다.
      const response = await instance.get(`/recipe/find?q=${q}`);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // 검색이 완료되면 로딩 상태를 false 로 변경합니다.
      setLoading(false);
    }
  };
  return {
    // 로딩 상태와 검색 함수를 반환합니다.
    loading,
    searchRecipe,
  };
};
