import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "@/components/Header";
import GlobalStyle from "@/styles/globalStyles";
import "@fortawesome/fontawesome-svg-core/styles.css";

const theme = {
  colors: {
    primaryRed: "#E81932",
    secondaryRed: "#D41730",
    primaryBlue: "#063048",
    primaryGreen: "#4caf50",
    primaryGray: "#687791",
    secondaryGray: "#333",
    primaryDisabled: "#cccccc",
    primaryWhite: "#FFFFFF",
    primaryBlack: "#000000",
    secondaryWhite: "#F5F5F5",
  },
};

const PageWrapper = styled.div<{ $isBlueBackground: boolean }>`
  min-height: 100vh;
  background-color: ${(props) =>
    props.$isBlueBackground ? theme.colors.primaryBlue : "#FFFFFF"};
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
