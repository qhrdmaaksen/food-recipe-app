import { RecipeCard, SearchBox } from "../../components";
import { FormEvent, Suspense, useState } from "react";
import { NoRecipe } from "./common";
import { IRECIPERESPONSE } from "../../@types";
import { useRecipe } from "../../hooks";
import { instance } from "../../config";
import useSWR from "swr";

export const Home = () => {
  //use swr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe", fetcher, { suspense: true });

  const { loading, searchRecipe } = useRecipe();
  const [query, setQuery] = useState<string>("");

  const [state, setState] = useState<IRECIPERESPONSE[]>(
    data as unknown as IRECIPERESPONSE[] | []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없다면 아무것도 하지 않는다.
    if (!query) {
      return;
    }
    const result: IRECIPERESPONSE[] | [] = await searchRecipe(query);

    if (result) {
      setState(result);
    }
  };

  const props = {
    title: "Recipes",
    onSearch: onSubmit,
    query,
    setQuery,
  };
  return (
      <Suspense fallback={<div>Loading</div>}>
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
