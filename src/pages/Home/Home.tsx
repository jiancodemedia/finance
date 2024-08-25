import { Props } from "./connect";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import { Autocomplete, TextField } from "@mui/material";
import { ExchangeRate } from "../../components/ExchangeRate/ExchangeRate";
import { CandlesChart } from "../../components/CandlesChart/CandlesChart";
import { LineChart } from "../../components/LineChart/LineChart";

function Home() {
  const [ticker, setTickers] = useState<string>("AUD/USD");

  return (
    <Container>
      <Autocomplete
        value={ticker}
        options={["AUD/USD", "EUR/USD", "GBP/USD"]}
        sx={{ width: 160 }}
        renderInput={(params) => <TextField {...params} label="FX" />}
        onChange={(event, newValue) => {
          setTickers(newValue);
        }}
        disableClearable
      />
      <ExchangeRate ticker={ticker} />
      <CandlesChart ticker={ticker} />
      <LineChart ticker={ticker} />
    </Container>
  );
}

export default Home;
