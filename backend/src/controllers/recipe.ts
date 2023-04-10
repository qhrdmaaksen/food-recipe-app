import { Request, Response } from "express";
import { Recipe } from "src/model";

// 모든 레시피 정보를 가져오는 함수
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    // populate() 메서드를 사용하여 user 필드를 채워준다.
    // populate() 메서드는 첫 번째 인자로 참조하는 필드를, 두 번째 인자로 해당 필드에 대한 정보를 가져올 필드를 받는다.
    // sort() 메서드를 사용하여 _id 필드를 기준으로 내림차순으로 정렬한다.
    const recipes = await Recipe.find({})
      .populate("user", "email")
      .sort({ _id: -1 })
      .exec();

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "모든 레시피 가져오기 요청을 처리하는 동안 오류가 발생했습니다.",
      });
  }
};

// 특정 레시피 정보를 가져오는 함수
export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id).populate("user", "email").exec();

    // 해당 레시피가 존재하지 않는 경우
    if (!recipe) {
      return res
        .status(404)
        .json({ error: "해당 레시피가 존재하지 않습니다." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "특정 레시피 가져오기 요청을 처리하는 동안 오류가 발생했습니다.",
      });
  }
};
