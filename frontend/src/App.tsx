import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Suspense} from "react";

function App() {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <div>Landing Page</div>,
            errorElement: <div>404 Error Page</div>
        }
    ])
  return (
    <div className="">
        <Suspense fallback={<div>loading...</div>}>
            <RouterProvider router={router} fallbackElement={<div>Fall back Element</div>} />
        </Suspense>
    </div>
  );
}

export default App;
