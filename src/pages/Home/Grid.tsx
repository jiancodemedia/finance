import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
  ticker: string;
  publisher: string;
}

interface ApiResponse {
  data: {
    publisher: string;
    ticker: string;
  }[];
  meta: {
    pagination: {
      page: number;
      per_page: number;
    };
  };
}

function Grid() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs] = useState<ColDef<RowData>[]>([
    { headerName: "Ticker", field: "ticker" },
    { headerName: "Publisher", field: "publisher" }
  ]);

  useEffect(() => {
    fetch(
      "https://api.finazon.io/latest/binance/binance/tickers?page_size=1000",
      {
        method: "GET",
        headers: {
          Authorization: "apikey 855c0ef53fa7486c99a2e7386bc8e49a9v"
        }
      }
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log("Fetched data:", data);
        const rowData: RowData[] = data.data.map((item) => ({
          ticker: item.ticker,
          publisher: item.publisher
        }));
        setRowData(rowData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={50}
      />
    </div>
  );
}

export default Grid;
