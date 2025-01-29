import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { usePromoEnabled } from "@/hooks/usePromoEnabled";
import { useFlights } from "@/hooks/useFlights";
import { ListFlightHeader } from "@/components/ListFlightHeader";
import { FlightCards } from "@/components/FlightCards";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.primaryWhite};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SortingBar = styled.div`
  background-color: ${(props) => props.theme.colors.primaryBlue};
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.colors.primaryWhite};

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    span {
      text-align: center;
      margin-bottom: 4px;
    }
  }
`;

const SortButton = styled.button<{ $isActive: boolean }>`
  background: ${(props) =>
    props.$isActive ? props.theme.colors.primaryGray : "none"};
  border: 1px solid white;
  padding: 5px 15px;
  color: ${(props) => props.theme.colors.primaryWhite};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryGray};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
`;

const FlightListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.secondaryWhite};

  @media (max-width: 768px) {
    margin: 0 -10px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${(props) => props.theme.colors.secondaryGray};
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;

export default function FlightListPage() {
  const router = useRouter();
  const { from, to, passengers = "1" } = router.query;
  const { flights, loading } = useFlights(from as string, to as string);
  const { isEnabled: promoEnabled } = usePromoEnabled();
  const [sortBy, setSortBy] = useState<"ECONOMY" | "BUSINESS">("ECONOMY");
  const [selectedFare, setSelectedFare] = useState<{
    [key: number]: "ECONOMY" | "BUSINESS" | null;
  }>({});

  const sortedFlights = [...flights].sort((a, b) => {
    const getPrice = (
      flight: (typeof flights)[0],
      type: "ECONOMY" | "BUSINESS"
    ) => {
      const basePrice =
        flight.fareCategories[type].subcategories[0].price.amount;
      return promoEnabled && type === "ECONOMY" ? basePrice * 0.5 : basePrice;
    };

    if (sortBy === "ECONOMY") {
      return getPrice(a, "ECONOMY") - getPrice(b, "ECONOMY");
    } else {
      return a.departureDateTimeDisplay.localeCompare(
        b.departureDateTimeDisplay
      );
    }
  });

  const handleFareSelect = (index: number, type: "ECONOMY" | "BUSINESS") => {
    setSelectedFare((prev) => ({
      ...prev,
      [index]: prev[index] === type ? null : type,
    }));
  };

  const handleFlightSelect = (
    flightIndex: number,
    fareType: "ECONOMY" | "BUSINESS",
    brandCode: string,
    amount: number
  ) => {
    const flight = sortedFlights[flightIndex];

    router.push({
      pathname: "/kabin-secim-sonucu",
      query: {
        status: flight.fareCategories[fareType].subcategories.find(
          (cat) => cat.brandCode === brandCode
        )?.status,
        amount: amount.toFixed(2),
        passengers,
      },
    });
  };

  return (
    <>
      <Head>
        <title>THY Frontend Challenge | Uçuşlar</title>
        <meta name="description" content="THY Frontend Challenge | Uçuşlar" />
      </Head>

      <PageContainer>
        <ContentWrapper>
          <ListFlightHeader />

          <FlightListContainer>
            <SortingBar>
              <span>Sıralama Kriteri</span>
              <SortButton
                $isActive={sortBy === "ECONOMY"}
                onClick={() => setSortBy("ECONOMY")}
              >
                Ekonomi Ücreti
              </SortButton>
              <SortButton
                $isActive={sortBy === "BUSINESS"}
                onClick={() => setSortBy("BUSINESS")}
              >
                Kalkış Saati
              </SortButton>
            </SortingBar>

            {loading ? (
              <LoadingMessage>Uçuşlar yükleniyor...</LoadingMessage>
            ) : (
              <FlightCards
                flights={sortedFlights}
                selectedFare={selectedFare}
                onFareSelect={handleFareSelect}
                onFlightSelect={handleFlightSelect}
              />
            )}
          </FlightListContainer>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}
