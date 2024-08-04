import { Props } from "./connect";
import { useEffect } from "react";
import { Container } from "./styles";
import { Button } from "@mui/material";

function Home(props: Props) {
  useEffect(() => {
    props.changeName("Count");
  }, []);

  return (
    <Container>
      <Button onClick={() => props.increment()}>Increment</Button>
      <Button onClick={() => props.decrement()}>Decrement</Button>
      <div>{`${props.name} ${props.count}`}</div>
    </Container>
  );
}

export default Home;
