import recipeOne from "../../assets/recipe-one.jpg";
import { Form, Input, Button } from "../../components";
import { FormEvent } from "react";

export const Landing = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};
  const handleState = (e: FormEvent<HTMLInputElement>) => {};
  return (
    <div className="container bg-black text-white h-[100%] flex flex-col-reverse md:flex-row w-full">
      <div className="w-full h-full">
        <Form
          className="flex items-center justify-center w-full h-full p-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full md:w-[50%]">
            <h2 className="text-orange-500 front-extrabold text-xl underline underline-offset-4">
              Foodie
            </h2>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              handleChange={handleState}
              className={`bg-zinc-900 py-1 px-4 w-full shadow-xl placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              handleChange={handleState}
              className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
            />
            <div className="w-full md:w-[50%] m-auto flex flex-col gap-2">
              <Button
                title={"Login"}
                type="submit"
                className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full`}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="w-full h-full saturate-200">
        <img
          src={recipeOne}
          alt="음식 레시피가 있는 요리"
          className="w-full h-full object-center object-cover"
        />
      </div>
    </div>
  );
};
