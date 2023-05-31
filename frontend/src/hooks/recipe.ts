import { useState } from "react";
import { IRECIPERESPONSE } from "../@types";
import { AxiosResponse } from "axios";
import { instance } from "../config";

export const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipe = async (
    q: string
  ): Promise<AxiosResponse<IRECIPERESPONSE[] | []> | any> => {
    try {
      setLoading(true);
      const response = await instance.get(`/recipe/find?q=${q}`);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    searchRecipe,
  };
};
