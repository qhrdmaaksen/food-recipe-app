import { Request, Response } from "express";
import { Recipe } from "src/model";

export const searchRecipe = async (req: Request, res: Response) => {
  // 클라이언트에게 전달받은 검색어
  const { q } = req.query;

  const pipeline = [
    {
      $search: {
        index: "recipe",
        text: {
          query: q,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      }
    }
  ];
};

// 모든 레시피 정보를 가져오는 함수
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    // populate() 메서드를 사용하여 user 필드를 채워준다.
    // populate() 메서드는 첫 번째 인자로 참조하는 필드를, 두 번째 인자로 해당 필드에 대한 정보를 가져올 필드를 받는다.
    // sort() 메서드를 사용하여 _id 필드를 기준으로 내림차순으로 정렬한다.
    const recipes = await Recipe.find({})
      .populate("user", "email")
      .sort({ _id: -1 })
      .exec(); // exec() 메서드를 사용하여 쿼리를 실행한다.

    // 레시피가 존재하는 경우 레시피 정보를 클라이언트에게 전달한다.
    return res.status(200).json(recipes);
  } catch (error) {
    console.log("모든 레시피 가져오기 오류 : ", error);
    // 레시피가 존재하지 않는 경우 오류 메시지를 클라이언트에게 전달한다.
    res.status(500).json({
      error: "모든 레시피 가져오기 요청을 처리하는 동안 오류가 발생했습니다.",
    });
  }
};

// 특정 레시피 정보를 가져오는 함수
export const getRecipe = async (req: Request, res: Response) => {
  //
  const { id } = req.params;
  try {
    // findById() 메서드를 사용해 id 로 특정 레시피를 가져와 user, email 필드를 populate 를 사용해 채워준다.
    const recipe = await Recipe.findById(id).populate("user", "email").exec();

    // 해당 레시피가 존재하지 않는 경우
    if (!recipe) {
      return res
        .status(404)
        .json({ error: "해당 레시피가 존재하지 않습니다." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.log("특정 레시피 가져오기 오류 : ", error);
    res.status(500).json({
      error: "특정 레시피 가져오기 요청을 처리하는 동안 오류가 발생했습니다.",
    });
  }
};

// 특정 유저가 작성한 레시피 정보를 가져오는 함수
export const getUserRecipes = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const recipes = await Recipe.find({ user: userId })
      .populate("user", "email")
      .sort({ _id: -1 })
      .exec();

    // 해당 유저가 작성한 레시피가 존재하지 않는 경우
    if (!recipes?.length) {
      return res
        .status(404)
        .json({ error: "해당 유저가 작성한 레시피가 존재하지 않습니다." });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.log("유저 레시피 가져오기 오류 : ", error);
    res.status(500).json({
      error: "유저 레시피 가져오기 요청을 처리하는 동안 오류가 발생했습니다.",
    });
  }
};
