import { FC, useEffect, useRef, useState } from "react";
import { getCountries, getSports } from "../../apis/olympic";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Countries, Sport } from "../../types/api/Olympic";
import { Container } from "./styles";

export const OlympicGrid: FC = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchOlympic = async () => {
      try {
        const countriesResponse = await getCountries("USA");
        const countryData = countriesResponse.data.data;
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };
    fetchOlympic();
  }, []);

  useEffect(() => {
    const fetchSport = async () => {
      try {
        const sportsResponse = await getSports("a");
        const sportData = sportsResponse.data.data;
        setSports(sportData);
      } catch (error) {
        console.error("Error fetching sports", error);
      }
    };
    fetchSport();
  }, []);

  const country: ColDef[] = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Continent", field: "continent" },
    { headerName: "Flag", field: "flag_url" },
    { headerName: "Gold medals", field: "gold_medals" },
    { headerName: "Silver medals", field: "silver_medals" },
    { headerName: "Bronze medals", field: "bronze_medals" },
    { headerName: "Total medals", field: "total_medals" },
    { headerName: "Rank", field: "rank" },
    { headerName: "Rank total medals", field: "rank_total_medals" }
  ];

  const sport: ColDef[] = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Pictogram url", field: "pictogram_url" }
  ];

  return (
    <Container className="ag-theme-alpine">
      <AgGridReact<Countries>
        ref={gridRef}
        rowData={countries}
        columnDefs={country}
      />
      <AgGridReact<Sport> ref={gridRef} rowData={sports} columnDefs={sport} />
    </Container>
  );
};
