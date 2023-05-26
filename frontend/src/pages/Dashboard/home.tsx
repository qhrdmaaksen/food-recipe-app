import { SearchBox } from "../../components";
import { FormEvent, useState } from "react";

export const Home = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {};
  const [query, setQuery] = useState<string>("");

  const props = {
    title: "Recipes",
    onSearch: onSubmit,
    query,
    setQuery,
  };
  return (
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
    </div>
  );
};
