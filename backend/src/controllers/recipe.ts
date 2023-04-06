import { Request, Response } from "express";
import { Recipe } from "src/model";
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
      // populate() 메서드를 사용하여 user 필드를 채워준다.
      // populate() 메서드는 첫 번째 인자로 참조하는 필드를, 두 번째 인자로 해당 필드에 대한 정보를 가져올 필드를 받는다.
      // sort() 메서드를 사용하여 _id 필드를 기준으로 내림차순으로 정렬한다.
    const recipes = await Recipe.find({}).populate("user", "email").sort({_id: -1});
  } catch (error) {}
};
