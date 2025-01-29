import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 20px;
`;

const StatusMessage = styled.div<{ $isAvailable: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.colors.primaryBlack};
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryGray};

  svg {
    font-size: 20px;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

const TotalLabel = styled.div`
  color: ${(props) => props.theme.colors.primaryBlack};
  font-size: 20px;
  font-weight: 400;
`;

const TotalAmount = styled.div`
  color: ${(props) => props.theme.colors.primaryBlue};
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  .per-passenger {
    font-size: 14px;
    color: ${(props) => props.theme.colors.primaryGray};
  }

  .total {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .currency {
    color: ${(props) => props.theme.colors.primaryBlue};
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.colors.primaryRed};
  float: right;
  margin-top: 40px;

  &:hover {
    background: ${(props) => props.theme.colors.secondaryRed};
  }
`;

export default function KabinSecimi() {
  const router = useRouter();
  const { amount, status = "error", passengers = "1" } = router.query;
  const isAvailable =
    typeof status === "string" && status.toLowerCase() === "available";

  const perPassengerAmount =
    typeof amount === "string" ? parseFloat(amount) : 0;
  const passengerCount =
    typeof passengers === "string" ? parseInt(passengers, 10) : 1;
  const totalAmount = perPassengerAmount * passengerCount;

  const messages = {
    available: "Kabin seçiminiz tamamlandı.",
    error: "Kabin seçiminiz tamamlanamadı.",
  };

  return (
    <>
      <Head>
        <title>
          {isAvailable ? "Kabin Seçimi Tamamlandı" : "Kabin Seçimi Hatası"} |
          THY
        </title>
        <meta
          name="description"
          content={messages[isAvailable ? "available" : "error"]}
        />
      </Head>

      <Container>
        <ContentWrapper>
          <StatusMessage $isAvailable={isAvailable}>
            {isAvailable ? (
              <FontAwesomeIcon icon={faCheckCircle} color="#4CAF50" />
            ) : (
              <FontAwesomeIcon icon={faTimesCircle} color="#E81932" />
            )}
            {messages[isAvailable ? "available" : "error"]}
          </StatusMessage>

          {isAvailable ? (
            <TotalSection>
              <TotalLabel>Toplam tutar</TotalLabel>
              <TotalAmount>
                <span className="per-passenger">
                  Yolcu başına: {perPassengerAmount.toFixed(2)} TRY
                </span>
                <div className="total">
                  <span>{totalAmount.toFixed(2)}</span>
                  <span className="currency">TRY</span>
                </div>
              </TotalAmount>
            </TotalSection>
          ) : (
            <Button onClick={() => router.push("/")}>Başa Dön</Button>
          )}
        </ContentWrapper>
      </Container>
    </>
  );
}
