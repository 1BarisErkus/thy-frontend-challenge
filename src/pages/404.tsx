import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background-color: #063048;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: white;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  margin: 0;
  color: #e81932;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  margin: 20px 0;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  background: #e81932;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;

  &:hover {
    background: #d41730;
  }
`;

const PlaneIcon = styled(FontAwesomeIcon)`
  transform: rotate(-45deg);
  font-size: 60px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Sayfa Bulunamadı | THY</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı" />
      </Head>

      <Container>
        <ErrorCode>
          4<PlaneIcon icon={faPlane} />4
        </ErrorCode>
        <Title>Üzgünüz, bu uçuş rotası bulunamadı!</Title>
        <Description>
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak
          kullanım dışı olabilir.
        </Description>
        <Button onClick={() => router.push("/")}>Ana Sayfaya Dön</Button>
      </Container>
    </>
  );
}
