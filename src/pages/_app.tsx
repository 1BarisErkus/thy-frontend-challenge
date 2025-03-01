import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "@/components/Header";
import GlobalStyle from "@/styles/globalStyles";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { theme } from "@/styles/theme";

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
