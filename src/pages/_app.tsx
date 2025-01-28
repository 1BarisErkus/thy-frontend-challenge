import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Header } from "@/components/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import styled from "styled-components";
import GlobalStyle from "@/styles/globalStyles";

const theme = {
  colors: {
    primary: "#063048",
    secondary: "#E81932",
    text: "#FFFFFF",
    placeholder: "#666666",
  },
};

const PageWrapper = styled.div<{ $isBlueBackground: boolean }>`
  min-height: 100vh;
  background-color: ${(props) =>
    props.$isBlueBackground ? "#063048" : "#FFFFFF"};
`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isBlueBackground = router.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageWrapper $isBlueBackground={isBlueBackground}>
        <Header $isBlueBackground={isBlueBackground} />
        <Component {...pageProps} />
      </PageWrapper>
    </ThemeProvider>
  );
}
