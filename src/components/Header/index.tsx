import styled from "styled-components";

type HeaderProps = {
  $isBlueBackground: boolean;
};

const HeaderWrapper = styled.header`
  background-color: transparent;
  padding: 20px 40px 0 40px;
`;

const HeaderContent = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid
    ${(props) => (props.$isBlueBackground ? "#FFFFFF" : "#000")};
  color: ${(props) => (props.$isBlueBackground ? "#FFFFFF" : "#000")};
`;

const Logo = styled.a`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
`;

export const Header = ({ $isBlueBackground }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <HeaderContent $isBlueBackground={$isBlueBackground}>
        <Logo href="/">turkishairlines.com</Logo>
        <p>
          search<strong>Flight Challenge</strong>
        </p>
      </HeaderContent>
    </HeaderWrapper>
  );
};
