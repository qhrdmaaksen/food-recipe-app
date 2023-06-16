import { RecipeCard, SearchBox } from "../../components";
import React, { FormEvent, Suspense, useState } from "react";
import { NoRecipe } from "./common";
import { IRECIPERESPONSE } from "../../@types";
import { useRecipe } from "../../hooks";
import { instance } from "../../config";
import useSWR from "swr";
import cogoToast from "cogo-toast";
import { SearchLoader, UILoader } from "../../components/loaders";

export const MyRecipes = () => {
  // fetcher 에는 api 주소를 넣고, 해당 api 를 통해 데이터를 가져온다.
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  // useSWR 을 통해 데이터를 가져온다.
  const { data, error } = useSWR(
    `/recipe/user/${sessionStorage.getItem("id")}`,
    fetcher,
    { suspense: true }
  );

  // useRecipe hook 을 통해 loading, searchRecipe 함수를 가져온다.
  const { loading, searchRecipe } = useRecipe();
  // 검색어를 저장할 state
  const [query, setQuery] = useState<string>("");
  // 검색 결과를 저장할 state
  const [state, setState] = useState<IRECIPERESPONSE[]>(
    data as unknown as IRECIPERESPONSE[] | []
  );

  // 에러가 있다면 에러를 토스트로 띄우고, null 을 반환한다.
  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  // 검색어를 입력하고, 검색 버튼을 누르면 실행된다.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없다면 아무것도 하지 않는다.
    if (!query) {
      return;
    }
    // 검색 결과를 가져온다.
    const result: IRECIPERESPONSE[] | [] = await searchRecipe(query);

    // 검색 결과가 있다면, state 에 저장한다.
    if (result) {
      setState(result);
    }
  };
  // SearchBox 에 props 를 넘겨준다.
  const props = {
    title: "Recipes",
    onSearch: onSubmit,
    query,
    setQuery,
  };
  return (
    <Suspense fallback={<UILoader />}>
      <div className="text-white w-full h-full">
        <SearchBox {...props} />
        {/*
            <SearchBox
                title: 'Recipes',
                onSearch: onSubmit,
                query,
                setQuery
            />
        */}

        {!!state?.length ? (
          <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
            {state.map((recipe: IRECIPERESPONSE, index: number) => (
              <RecipeCard
                key={index + recipe._id}
                {...recipe}
                user={recipe?.user?.email as string}
              />
            ))}
          </div>
        ) : (
          <>
            <NoRecipe />
          </>
        )}
      </div>
    </Suspense>
  );
};
