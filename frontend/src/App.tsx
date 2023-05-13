import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Landing } from "./pages/Landing";
import {Home} from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <div>404 Error Page</div>,
    },
    {
      path: "/dashboard",
      element: <div>Dashboard</div>,
      errorElement: <div>404 Error Page2</div>,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    }
  ]);
  return (
    <div className="container w-[100vw] h-[100vh]">
      <Suspense fallback={<div>loading...</div>}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Fall back Element</div>}
        />
      </Suspense>
    </div>
  );
}

export default App;
