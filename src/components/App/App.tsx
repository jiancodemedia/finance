import { Props } from "./connect";
import { useEffect } from "react";
import { Container } from "./styles";
import { Button } from "@mui/material";

function App(props: Props) {
  useEffect(() => {
    props.increment();
  }, []);

  return (
    <Container>
      <Button onClick={() => props.increment()}>Increment</Button>
      <Button onClick={() => props.decrement()}>Decrement</Button>
      <div>Learn React {props.count} </div>
    </Container>
  );
}

export default App;
