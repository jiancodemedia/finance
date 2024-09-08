import React, { useEffect, useState, FC, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, IRowNode } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { StockData } from "../../types/api/Stock";
import { getTickers } from "../../apis/stock";
import { Container } from "./styles";
import { Menu } from "../../components/Menu/Menu";

export const Grid: FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<StockData[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [exchange, setExchange] = useState<string | null>(null);
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  const [exchangeOptions, setExchangeOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const tickerResponse = await getTickers(10);
        const data = tickerResponse.data.data.data;

        setRowData(data);
      } catch (error) {
        console.error("Error fetching tickers", error);
      }
    };
    fetchTickers();
  }, []);

  useEffect(() => {
    setNameOptions([...new Set(rowData.map((d) => d.name))]);
    setSymbolOptions([...new Set(rowData.map((d) => d.symbol))]);
    setExchangeOptions([...new Set(rowData.map((d) => d.exchange))]);
  }, [rowData]);

  useEffect(() => {
    if (name) {
      // Apply filter to row data with the selected name
      const filter = rowData.filter((d) => d.name == name);
      // Extract symbols from row data
      const symbols = filter.map((d) => d.symbol);
      // Using set to remove all duplicate symbols
      setSymbolOptions([...new Set(symbols)]);

      const exchanges = filter.map((d) => d.exchange);
      setExchangeOptions([...new Set(exchanges)]);
    } else {
      setSymbolOptions([...new Set(rowData.map((d) => d.symbol))]);
      setExchangeOptions([...new Set(rowData.map((d) => d.exchange))]);
    }
  }, [name]);
  // useEffect(() => {}, [symbol]);
  // useEffect(() => {}, [exchange]);
  const stocks: ColDef[] = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Currency", field: "currency" },
    { headerName: "Exchange", field: "exchange" },
    { headerName: "Country", field: "country" },
    { headerName: "Type", field: "type" },
    { headerName: "FIGI Code", field: "figi_code" }
  ];

  useEffect(() => {
    gridRef.current?.api?.onFilterChanged();
  }, [name, symbol, exchange]);

  const isExternalFilterPresent = useCallback((): boolean => {
    return name != null || symbol != null || exchange != null;
  }, [name, symbol, exchange]);

  const doesExternalFilterPass = useCallback(
    ({ data }: IRowNode<StockData>): boolean => {
      if (name != null && data?.name != name) {
        return false;
      } else if (symbol != null && data?.symbol != symbol) {
        return false;
      } else if (exchange != null && data?.exchange != exchange) {
        return false;
      }
      return true;
    },
    [name, symbol, exchange]
  );

  return (
    <Container className="ag-theme-alpine">
      <Menu
        name={name}
        symbol={symbol}
        exchange={exchange}
        nameOptions={nameOptions}
        symbolOptions={symbolOptions}
        exchangeOptions={exchangeOptions}
        onChangeName={setName}
        onChangeSymbol={setSymbol}
        onChangeExchange={setExchange}
        onSearch={(text) => {
          gridRef.current?.api.setGridOption("quickFilterText", text);
        }}
      />
      <AgGridReact<StockData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={stocks}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      />
    </Container>
  );
};
