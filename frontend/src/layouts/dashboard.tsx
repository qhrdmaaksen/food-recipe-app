import { useContext, useLayoutEffect } from "react";
import { AuthenticationContext } from "../context";
import { AUTH_TYPE } from "../@types";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const routes = [
  { name: "home", to: "/dashboard" },
  { name: "Add Recipe", to: "/dashboard/addrecipe" },
  { name: "My Recipes", to: "/dashboard/myrecipes" },
];

export const DashboardLayout = () => {
  const navigate = useNavigate();
  // useParams 를 통해 현재 path 를 가져온다.
  const pathname = useParams().pathname;
  // 렌더링 이후 로그인이 되어있지 않은 경우 landing page 로 이동한다.
  useLayoutEffect(() => {
    if (!sessionStorage.getItem("email") && !sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  // onLogout, loading 은 AuthenticationContext 에서 가져온다.
  const { onLogout, loading } = useContext(AuthenticationContext) as AUTH_TYPE;
  return (
    <div className="w-full h-full bg-black overflow-x-hidden">
      <div className="h-[60px] md:h-[80px] bg-zinc-900 flex items-center justify-between px-3 sticky top-0 z-50">
        <div className="flex items-center">
          <h2 className="text-white font-bold text-xl underline-offset-4 underline">
            <NavLink to="/dashboard">Foodie</NavLink>
          </h2>
          <span className="text-orange-700 font-extrabold text-xl pl-2">.</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full h-full z-10 relative">
        <div className="hidden md:block bg-zinc-900 h-full w-[20%] fixed">
          <div className="md:flex gap-8 items-start w-full p-3">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1612766959025-ac18e2b3bb96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="A image"
            />
            <div>
              <p className="text-orange-500 font-light">krman@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 mt-3">
          {routes.map(({ name, to }) => (
            <NavLink
              key={name + to}
              to={to}
              className={({ isActive }) =>
                isActive && pathname === to
                  ? "text-white font-thin text-sm bg-orange-500 p-4"
                  : "text-white font-thin text-sm hover:bg-orange-500 p4"
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
