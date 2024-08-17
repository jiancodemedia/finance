import { Link, RouterProvider, createHashRouter } from "react-router-dom";
import Home from "../../pages/Home/connect";
import App from "../App/App";
import Chart from "../../pages/Home/Chart";
import Grid from "../../pages/Home/Grid";

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
        path: "about",
        element: <div>About</div>
      },
      {
        path: "chart",
        element: <Chart />
      },
      {
        path: "grid",
        element: <Grid />
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
