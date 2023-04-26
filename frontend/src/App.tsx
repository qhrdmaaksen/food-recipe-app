import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Suspense} from "react";
import {Landing} from "./pages/Landing";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing/>,
            errorElement: <div>404 Error Page</div>
        }
    ])
  return (
    <div className="container w-[100vw] h-[100vh]">
        <Suspense fallback={<div>loading...</div>}>
            <RouterProvider router={router} fallbackElement={<div>Fall back Element</div>} />
        </Suspense>
    </div>
  );
}

export default App;
