import { FC, useEffect, useState } from "react";
import { getPrice } from "../../apis/forex";
import { Container, Input } from "./styles";

type Prop = {
  ticker: string;
};

export const ExchangeRate: FC<Prop> = ({ ticker }) => {
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await getPrice(ticker);
        setPrice(response.data.p);
      } catch (error) {
        console.error("Error fetching price: ", error);
      }
    };
    fetchPrice();
  }, [ticker]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const convertedAmount = price * quantity;

  return (
    <Container>
      <Input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min={1}
      />
      <span>
        {ticker.split("/")[0]} = {convertedAmount} {ticker.split("/")[1]}
      </span>
    </Container>
  );
};
