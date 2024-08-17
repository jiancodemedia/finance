import { Outlet, NavLink } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Container } from "./styles";

function App() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/chart">Chart</NavLink>
          </li>
          <li>
            <NavLink to="/grid">Grid</NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}

export default App;
