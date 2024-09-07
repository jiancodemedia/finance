import React, { useEffect, useState, FC } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Data, TickerResponse } from "../../apis/stock";
import { getTickers } from "../../types/api/Stock";

interface Prop {
  ticker: string;
  setTickers(ticker: string): void;
}

const Grid: FC<Prop> = ({ ticker, setTickers }) => {
  const [rowData, setRowData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tickerResponse: TickerResponse = await getTickers(50);
        setRowData(tickerResponse.data);
        setTickers(tickerResponse.data);
      } catch (error) {
        console.error("Error fetching tickers", error);
      }
    };
    fetchData();
  }, [setTickers]);

  const stocks: ColDef[] = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Currency", field: "currency" },
    { headerName: "Exchange", field: "exchange" },
    { headerName: "Country", field: "country" },
    { headerName: "Type", field: "type" },
    { headerName: "FIGI Code", field: "figi_code" },
    { headerName: "Price", field: "p" }
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
