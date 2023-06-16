import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Landing } from "./pages/Landing";
import {AddRecipe, Home, More, MyRecipes} from "./pages/Dashboard";
import { DashboardLayout } from "./layouts";
import { UILoader } from "./components/loaders";

function App() {
  // router 설정, element 는 해당 path 에 접근했을 때 보여줄 컴포넌트
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <div>404 Error Page</div>,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <div>404 Error Page2</div>,
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/dashboard/addrecipe",
          element: <AddRecipe />,
        },
        {
          path: "/dashboard/myrecipes",
          element: <MyRecipes />,
        },
        {
          path: "/dashboard/recipe/:id",
          element: <More />,
        },
      ],
    },
  ]);
  return (
    <div className="container w-[100vw] h-[100vh]">
      <Suspense fallback={<UILoader />}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Fall back Element</div>}
        />
      </Suspense>
    </div>
  );
}

export default App;
