import styled from "styled-components";
import { FlightInfo } from "./FlightInfo";
import { FareBox } from "./FareBox";
import { FareCategory as FareCategoryComponent } from "./FareCategory";
import { usePromoEnabled } from "../../hooks/usePromoEnabled";
import { useEffect, useState } from "react";
import { Flight } from "@/hooks/useFlights";

const FlightListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }
`;

const FlightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  background: ${(props) => props.theme.colors.primaryWhite};
  border-radius: 4px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
  }
`;

const FareCategories = styled.div<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? "grid" : "none")};
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: ${(props) => props.theme.colors.secondaryWhite};
  margin-top: 16px;
  padding: 16px 0;
  border-radius: 4px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
    margin-top: 12px;
  }
`;

type FlightCardsProps = {
  flights: Flight[];
  selectedFare: { [key: number]: "ECONOMY" | "BUSINESS" | null };
  onFareSelect: (index: number, type: "ECONOMY" | "BUSINESS") => void;
  onFlightSelect: (
    flightIndex: number,
    fareType: "ECONOMY" | "BUSINESS",
    brandCode: string,
    amount: number
  ) => void;
};

export const FlightCards = ({
  flights,
  selectedFare,
  onFareSelect,
  onFlightSelect,
}: FlightCardsProps) => {
  const { isEnabled: promoEnabled } = usePromoEnabled();
  const [disabledStates, setDisabledStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const newDisabledStates: { [key: string]: boolean } = {};
    flights.forEach((flight, flightIndex) => {
      const selectedFareType = selectedFare[flightIndex];

      if (selectedFareType) {
        flight.fareCategories[selectedFareType].subcategories.forEach(
          (category) => {
            const key = `${flightIndex}-${selectedFareType}-${category.brandCode}`;

            newDisabledStates[key] =
              promoEnabled && category.brandCode !== "ecoFly";
          }
        );
      }
    });
    setDisabledStates(newDisabledStates);
  }, [promoEnabled, flights, selectedFare]);

  const getDiscountedPrice = (price: number, brandCode: string) => {
    if (promoEnabled && brandCode === "ecoFly") {
      return price * 0.5;
    }
    return price;
  };

  const isButtonDisabled = (
    flightIndex: number,
    fareType: string,
    brandCode: string
  ) => {
    const key = `${flightIndex}-${fareType}-${brandCode}`;
    return disabledStates[key] || false;
  };

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
          fareCategories,
        } = flight;

        const selectedFareType = selectedFare[index];
        const categories = selectedFareType
          ? fareCategories[selectedFareType].subcategories
          : [];

        return (
          <FlightSection key={index}>
            <Card>
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
                amount={fareCategories.ECONOMY.subcategories[0].price.amount}
                isSelected={selectedFareType === "ECONOMY"}
                onSelect={() => onFareSelect(index, "ECONOMY")}
              />

              <FareBox
                type="BUSINESS"
                amount={fareCategories.BUSINESS.subcategories[0].price.amount}
                isSelected={selectedFareType === "BUSINESS"}
                onSelect={() => onFareSelect(index, "BUSINESS")}
              />
            </Card>

            <FareCategories $isVisible={!!selectedFareType}>
              {categories.map((category, categoryIndex) => {
                const isDisabled = isButtonDisabled(
                  index,
                  selectedFareType!,
                  category.brandCode
                );
                const discountedPrice = getDiscountedPrice(
                  category.price.amount,
                  category.brandCode
                );
                const hasDiscount = discountedPrice !== category.price.amount;

                return (
                  <FareCategoryComponent
                    key={categoryIndex}
                    brandCode={category.brandCode}
                    price={discountedPrice}
                    originalPrice={
                      hasDiscount ? category.price.amount : undefined
                    }
                    rights={category.rights}
                    isDisabled={isDisabled}
                    onSelect={() =>
                      onFlightSelect(
                        index,
                        selectedFareType!,
                        category.brandCode,
                        discountedPrice
                      )
                    }
                  />
                );
              })}
            </FareCategories>
          </FlightSection>
        );
      })}
    </FlightListContainer>
  );
};
