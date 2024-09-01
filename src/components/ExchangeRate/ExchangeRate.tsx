import { FC, useEffect, useState, ChangeEvent } from "react";
import { getPrice } from "../../apis/forex";
import { Container } from "./styles";
import { Autocomplete, TextField } from "@mui/material";
// import {} from "../../apis/forexSubscription";

type Prop = {
  ticker: string;
  setTickers(ticker: string): void;
};

export const ExchangeRate: FC<Prop> = ({ ticker, setTickers }) => {
  const [price, setPrice] = useState<number>(1);
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await getPrice(ticker);
        setPrice(response.data.p);
        setAmount1(amount1);
        setAmount2(amount1 * response.data.p);
      } catch (error) {
        console.error("Error fetching price: ", error);
      }
    };
    fetchPrice();
  }, [ticker]);

  const handleAmount1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setAmount1(value);
    setAmount2(value * price);
  };

  const handleAmount2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setAmount1(value * price);
    setAmount2(value);
  };

  const [from, to] = ticker.split("/");

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
      <TextField
        label={from}
        type="number"
        value={amount1}
        onChange={handleAmount1Change}
      />
      <TextField
        label={to}
        type="number"
        value={amount2}
        onChange={handleAmount2Change}
      />
    </Container>
  );
};
