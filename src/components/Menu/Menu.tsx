import { Container } from "./styles";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  name: string | null;
  symbol: string | null;
  exchange: string | null;
  nameOptions: string[];
  symbolOptions: string[];
  exchangeOptions: string[];
  onChangeName(text: string | null): void;
  onChangeSymbol(text: string | null): void;
  onChangeExchange(text: string | null): void;
  onSearch(text: string): void;
};

export const Menu = ({
  onSearch,
  name,
  nameOptions,
  onChangeName,
  symbol,
  onChangeSymbol,
  symbolOptions,
  exchange,
  exchangeOptions,
  onChangeExchange
}: Props) => {
  return (
    <Container>
      <TextField
        size="small"
        onChange={(e) => onSearch(e.currentTarget.value)}
        placeholder="Search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="medium" />
              </InputAdornment>
            )
          }
        }}
      />
      <Autocomplete
        size="small"
        value={name}
        options={nameOptions}
        onChange={(e, v) => onChangeName(v)}
        sx={{ minWidth: 300 }}
        renderInput={(params) => <TextField {...params} label="Name" />}
      />
      <Autocomplete
        size="small"
        value={symbol}
        options={symbolOptions}
        onChange={(e, v) => onChangeSymbol(v)}
        sx={{ minWidth: 300 }}
        renderInput={(params) => <TextField {...params} label="Symbol" />}
      />
      <Autocomplete
        size="small"
        value={exchange}
        options={exchangeOptions}
        onChange={(e, v) => onChangeExchange(v)}
        sx={{ minWidth: 300 }}
        renderInput={(params) => <TextField {...params} label="Exchange" />}
      />
    </Container>
  );
};
