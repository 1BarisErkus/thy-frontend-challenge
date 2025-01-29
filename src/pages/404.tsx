import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primaryWhite};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.primaryBlack};

  h1 {
    font-size: 120px;
    color: ${(props) => props.theme.colors.primaryRed};
    display: flex;
    align-items: center;
  }

  h2 {
    font-size: 32px;
    margin: 20px 0;
    font-weight: normal;
  }

  p {
    font-size: 18px;
    margin-bottom: 40px;
  }

  button {
    background: ${(props) => props.theme.colors.primaryRed};

    &:hover {
      background: ${(props) => props.theme.colors.secondaryRed};
    }
  }
`;

const PlaneIcon = styled(FontAwesomeIcon)`
  transform: rotate(-45deg);
  font-size: 60px;
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
        <h1>
          4<PlaneIcon icon={faPlane} />4
        </h1>
        <h2>Üzgünüz, bu uçuş rotası bulunamadı!</h2>
        <p>
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak
          kullanım dışı olabilir.
        </p>
        <button onClick={() => router.push("/")}>Ana Sayfaya Dön</button>
      </Container>
    </>
  );
}
