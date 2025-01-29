import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { usePromoEnabled } from "../../hooks/usePromoEnabled";

const Header = styled.div`
  background-color: ${(props) => props.theme.colors.primaryRed};
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryWhite};

  @media (max-width: 768px) {
    width: 60px;
    padding: 8px 16px;
    font-size: 11px;
  }
`;

const FlightBasicInfo = styled.span`
  font-size: 24px;
  color: ${(props) => props.theme.colors.secondaryGray};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const PromoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin: 16px 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PromoText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryGray};

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

const Toggle = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.primaryGray};
  border-radius: 10px;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: transform 0.2s;
  }

  &[data-enabled="true"] {
    background-color: ${(props) => props.theme.colors.primaryGreen};
    &:after {
      transform: translateX(20px);
    }
  }
`;

const PromoEnabledText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryGray};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
`;

export const ListFlightHeader = () => {
  const router = useRouter();
  const { from, to, passengers } = router.query;
  const { isEnabled, togglePromoEnabled } = usePromoEnabled();

  const handleToggle = () => {
    const newState = !isEnabled;
    togglePromoEnabled(newState);
  };

  return (
    <>
      <Header>Uçuş</Header>
      <FlightBasicInfo>
        {from} - {to}, {passengers} Yolcu
      </FlightBasicInfo>
      <PromoSection>
        <PromoText>Promosyon Kodu</PromoText>
        <Toggle data-enabled={isEnabled} onClick={handleToggle} />
      </PromoSection>
      {isEnabled && (
        <>
          <PromoEnabledText>
            Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini
            %50 indirimle satın alabilirsiniz!
          </PromoEnabledText>
          <PromoEnabledText>
            Promosyon Kodu seçeneği aktifken Eco Fly paketi haticinde seçim
            yapılamamaktadır.
          </PromoEnabledText>
        </>
      )}
    </>
  );
};
