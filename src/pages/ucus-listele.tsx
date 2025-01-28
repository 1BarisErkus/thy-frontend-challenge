import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import flightsData from "../db/flights.json";
import { ListFlightHeader } from "@/components/ListFlightHeader";
import { FlightCards } from "@/components/FlightCards";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SortingBar = styled.div`
  background-color: #1c2a3a;
  padding: 10px 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SortButton = styled.button<{ isActive: boolean }>`
  background: ${(props) =>
    props.isActive ? "rgba(192, 192, 192, 0.4)" : "none"};
  border: 1px solid white;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FlightListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f5f5f5;
`;

type Flight = {
  originAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
  };
  destinationAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
  };
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    [key: string]: {
      subcategories: Array<{
        status: string;
        price: {
          amount: number;
          currency: string;
        };
      }>;
    };
  };
};

export default function FlightListPage() {
  const { query } = useRouter();
  const { from, to } = query;

  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [promoEnabled, setPromoEnabled] = useState(false);
  const [sortBy, setSortBy] = useState<"ECONOMY" | "BUSINESS">("ECONOMY");
  const [selectedFare, setSelectedFare] = useState<{
    [key: number]: "ECONOMY" | "BUSINESS" | null;
  }>({});

  useEffect(() => {
    if (!from || !to) return;

    const flights = flightsData.flights.filter(
      ({ originAirport, destinationAirport }) =>
        originAirport.city.code === from && destinationAirport.city.code === to
    );

    if (sortBy === "ECONOMY") {
      flights.sort(
        ({ fareCategories: a }, { fareCategories: b }) =>
          a.ECONOMY.subcategories[0].price.amount -
          b.ECONOMY.subcategories[0].price.amount
      );
    } else if (sortBy === "BUSINESS") {
      flights.sort(
        (
          { departureDateTimeDisplay: aTime },
          { departureDateTimeDisplay: bTime }
        ) => new Date(aTime).getTime() - new Date(bTime).getTime()
      );
    }

    setFilteredFlights(flights);
  }, [from, to, sortBy]);

  const handleFareSelect = (index: number, type: "ECONOMY" | "BUSINESS") => {
    setSelectedFare((prev) => ({
      ...prev,
      [index]: prev[index] === type ? null : type,
    }));
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <ListFlightHeader
          promoEnabled={promoEnabled}
          setPromoEnabled={setPromoEnabled}
        />

        <FlightListContainer>
          <SortingBar>
            <span>Sıralama Kriteri</span>
            <SortButton
              isActive={sortBy === "ECONOMY"}
              onClick={() => setSortBy("ECONOMY")}
            >
              Ekonomi Ücreti
            </SortButton>
            <SortButton
              isActive={sortBy === "BUSINESS"}
              onClick={() => setSortBy("BUSINESS")}
            >
              Kalkış Saati
            </SortButton>
          </SortingBar>

          <FlightCards
            flights={filteredFlights}
            selectedFare={selectedFare}
            onFareSelect={handleFareSelect}
          />
        </FlightListContainer>
      </ContentWrapper>
    </PageContainer>
  );
}
