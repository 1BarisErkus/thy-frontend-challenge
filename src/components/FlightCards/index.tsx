import styled from "styled-components";
import { FlightInfo } from "./FlightInfo";
import { FareBox } from "./FareBox";

const Card = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 16px;
`;

const FlightListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

type FlightCardsProps = {
  flights: Flight[];
  selectedFare: { [key: number]: "ECONOMY" | "BUSINESS" | null };
  onFareSelect: (index: number, type: "ECONOMY" | "BUSINESS") => void;
};

export const FlightCards = ({
  flights,
  selectedFare,
  onFareSelect,
}: FlightCardsProps) => {
  return (
    <FlightListContainer>
      {flights.map((flight, index) => {
        const {
          originAirport: {
            code: originCode,
            city: { name: originCity },
          },
          destinationAirport: {
            code: destinationCode,
            city: { name: destinationCity },
          },
          departureDateTimeDisplay,
          arrivalDateTimeDisplay,
          flightDuration,
          fareCategories: {
            ECONOMY: {
              subcategories: [
                {
                  price: { amount: economyAmount },
                },
              ],
            },
            BUSINESS: {
              subcategories: [
                {
                  price: { amount: businessAmount },
                },
              ],
            },
          },
        } = flight;

        return (
          <Card key={index}>
            <FlightInfo
              departureTime={departureDateTimeDisplay}
              departureCode={originCode}
              departureCity={originCity}
              arrivalTime={arrivalDateTimeDisplay}
              arrivalCode={destinationCode}
              arrivalCity={destinationCity}
              duration={flightDuration}
            />

            <FareBox
              type="ECONOMY"
              amount={economyAmount}
              isSelected={selectedFare[index] === "ECONOMY"}
              onSelect={() => onFareSelect(index, "ECONOMY")}
            />

            <FareBox
              type="BUSINESS"
              amount={businessAmount}
              isSelected={selectedFare[index] === "BUSINESS"}
              onSelect={() => onFareSelect(index, "BUSINESS")}
            />
          </Card>
        );
      })}
    </FlightListContainer>
  );
};
