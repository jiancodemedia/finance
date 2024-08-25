import { FC, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getPrice } from "../../apis/forex";

type Prop = {
  ticker: string;
};

export const ExchangeRate: FC<Prop> = ({ ticker }) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const reponse = await getPrice(ticker);
        setPrice(reponse.data.p);
      } catch (error) {
        console.error("Error fetching price: ", error);
      }
    };
    fetchPrice();
  }, [ticker]);

  return (
    <Container>
      <div>
        <span>Price: </span>
        <span>{price}</span>
      </div>
    </Container>
  );
};
