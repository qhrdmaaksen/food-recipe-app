import { ReactNode } from "react";

export const Card = ({
  id,
  avatar,
  image,
  description,
  title,
  email,
  ingredients,
  note,
  children,
  isFull,
}: {
  id: string;
  avatar: string;
  image: string;
  description: string;
  title: string;
  email: string;
  ingredients: string;
  note?: string;
  children?: ReactNode;
  isFull?: boolean;
}) => {
  return (
    <div
      className={`w-full ${isFull ? "md:w-[50%]" : "md-w-[14rem]"} bg-zinc-900
        transition ease-in-out delay-150
        hover:translate-x-6
        hover:scale-100
        duration-300
        md-4
        `}
    >
      <img
        src={image}
        alt={title + "의 사진"}
        className={`w-full ${
          isFull ? "md:w-full" : "md-w-[14rem]"
        } h-full md:[10rem] ${
          isFull ? "md:h-[20rem]" : "md:h-[14rem]"
        } object-cover `}
      />
      <div
        className={`p-2 bg-zinc-900 w-full ${
          isFull ? "md:w-full" : "md-w-[14rem]"
        } h-[15rem] overflow-clip my-3`}
      >
        <div className="flex gap-4 items-start w-full">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={avatar}
            alt={"사용자의 사진"}
          />
          <div className="text-left">
            <p className="text-orange-500 font-light">{email}</p>
          </div>
        </div>
        <h2
          className={`text-orange-500 font-bold my-2 text-xl ${
            !isFull && "truncate overflow-hidden ..."
          }`}
        >
          {title}
        </h2>
        <p className="text-orange-500 font-light text-sm">
          재료:{" "}
          <span
            className={`text-white ${
              !isFull && "truncate overflow-hidden ..."
            }`}
          >
            {ingredients}
          </span>
        </p>

        <p
          className={`text-white font-light text-sm my-2 ${
            !isFull && "truncate overflow-hidden ..."
          }`}
        >
          {description}
        </p>

        {note && (
          <p className="text-orange-500 font-light text-sm py-1 md:py-4">
            노트: <span className="text-white">{note}</span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
