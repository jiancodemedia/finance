import { useState } from "react";
import { Container } from "./styles";
import { ExchangeRate } from "../../components/ExchangeRate/ExchangeRate";
import { CandlesChart } from "../../components/CandlesChart/CandlesChart";
import { LineChart } from "../../components/LineChart/LineChart";

function Home() {
  const [ticker, setTickers] = useState<string>("AUD/USD");

  return (
    <Container>
      <ExchangeRate ticker={ticker} setTickers={setTickers} />
      <CandlesChart ticker={ticker} />
      <LineChart ticker={ticker} />
    </Container>
  );
}

export default Home;
