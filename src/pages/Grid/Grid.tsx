import React, { useEffect, useState, FC } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Data, TickerResponse } from "../../apis/stock";
import { getTickers, getPrice } from "../../types/api/Stock";

const Grid: FC<{ ticker: string; setTickers: (tickers: Data[]) => void }> = ({
  ticker,
  setTickers
}) => {
  const [rowData, setRowData] = useState<Data[]>([]);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const tickerResponse: TickerResponse = await getTickers(50);
        setRowData(tickerResponse.data);
        setTickers(tickerResponse.data);
      } catch (error) {
        console.error("Error fetching tickers", error);
      }
    };
    fetchTickers();
  }, [setTickers]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        if (ticker) {
          const priceResponse = await getPrice(ticker);
          setPrice(priceResponse.data.p);
        }
      } catch (error) {
        console.error("Error fetching price", error);
      }
    };
    fetchPrice();
  }, [ticker]);

  const stocks: ColDef[] = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Currency", field: "currency" },
    { headerName: "Exchange", field: "exchange" },
    { headerName: "Country", field: "country" },
    { headerName: "Type", field: "type" },
    { headerName: "FIGI Code", field: "figi_code" },
    {
      headerName: "Price",
      field: "p",
      valueGetter: () => (price !== null ? price : "Loading...")
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
      <AgGridReact<Data>
        rowData={rowData}
        columnDefs={stocks}
        pagination={true}
        paginationPageSize={50}
      />
    </div>
  );
};

export default Grid;
