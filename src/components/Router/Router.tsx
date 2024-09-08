import { Link, RouterProvider, createHashRouter } from "react-router-dom";
import Home from "../../pages/Home/connect";
import App from "../App/App";
import { Grid } from "../../pages/Grid/Grid";

function NoMatch() {
  return (
    <div>
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export const routersConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "grid",
        element: <Grid />
      },
      {
        path: "about",
        element: <div>About</div>
      },
      {
        path: "*",
        element: <NoMatch />
      }
    ]
  }
];

const router = createHashRouter(routersConfig);

export default function Router() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
