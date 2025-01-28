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

const StatusMessage = styled.div<{ $isSuccess: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;

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
  color: #232b38;
  font-size: 20px;
  font-weight: 400;
`;

const TotalAmount = styled.div`
  color: #0745cb;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  .currency {
    color: #0745cb;
  }
`;

const Button = styled.button`
  background: #e81932;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  float: right;
  transition: background-color 0.2s;
  margin-top: 40px;

  &:hover {
    background: #d41730;
  }
`;

export default function KabinSecimi() {
  const router = useRouter();
  const { amount, status = "error" } = router.query;
  const isSuccess = status === "success";

  const messages = {
    success: "Kabin seçiminiz tamamlandı.",
    error: "Kabin seçiminiz tamamlanamadı.",
  };

  return (
    <>
      <Head>
        <title>
          {isSuccess ? "Kabin Seçimi Tamamlandı" : "Kabin Seçimi Hatası"} | THY
        </title>
        <meta
          name="description"
          content={messages[isSuccess ? "success" : "error"]}
        />
      </Head>

      <Container>
        <ContentWrapper>
          <StatusMessage $isSuccess={isSuccess}>
            {isSuccess ? (
              <FontAwesomeIcon icon={faCheckCircle} color="#4CAF50" />
            ) : (
              <FontAwesomeIcon icon={faTimesCircle} color="#E81932" />
            )}
            {messages[isSuccess ? "success" : "error"]}
          </StatusMessage>

          {isSuccess ? (
            <TotalSection>
              <TotalLabel>Toplam tutar</TotalLabel>
              <TotalAmount>
                <span>{amount}</span>
                TRY
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
