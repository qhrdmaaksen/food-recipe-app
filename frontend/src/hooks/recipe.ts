import { useState } from "react";
import { IRECIPEPAYLOAD, IRECIPERESPONSE } from "../@types";
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

  // 레시피 추가
  const addRecipe = async (payload: IRECIPEPAYLOAD): Promise<void> => {
    // note 를 제외한 나머지 데이터를 formData 에 담습니다.(노트는 없을 수도 있기 때문에)
    const { note, ...rest } = payload;
    const formData = new FormData();
    // payloadToArray 에는 note 를 제외한 나머지 데이터의 키 값이 들어갑니다.
    const payloadToArray = Object.keys(rest);
    // payloadToArray 에 담긴 키 값들을 formData 에 담습니다.
    for (const item of payloadToArray) {
      formData.append(item, rest[item as keyof typeof rest]);
    }
    // note 가 존재한다면 formData 에 담습니다.
    if (note) {
      formData.append("note", note);
    }

    try {
      setLoading(true);
      await instance.post("/recipe/create", formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    // 로딩 상태와 검색 함수를 반환합니다.
    loading,
    searchRecipe,
    addRecipe,
  };
};
