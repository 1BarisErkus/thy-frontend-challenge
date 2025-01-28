import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

type ListFlightHeaderProps = {
  promoEnabled: boolean;
  setPromoEnabled: (enabled: boolean) => void;
};

const Header = styled.div`
  background-color: #e81932;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const FlightBasicInfo = styled.span`
  font-size: 24px;
  color: #333;
`;

const PromoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PromoText = styled.span`
  font-size: 14px;
  color: #333;
`;

const Toggle = styled.div`
  width: 40px;
  height: 20px;
  background-color: #ccc;
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
    background-color: #4caf50;
    &:after {
      transform: translateX(20px);
    }
  }
`;

const PromoEnabledText = styled.p`
  font-size: 14px;
  color: #000;
  margin-bottom: 20px;
`;

export const ListFlightHeader = ({
  promoEnabled,
  setPromoEnabled,
}: ListFlightHeaderProps) => {
  const router = useRouter();
  const { from, to, passengers } = router.query;

  return (
    <>
      <Header>Uçuş</Header>
      <FlightBasicInfo>
        {from} - {to}, {passengers} Yolcu
      </FlightBasicInfo>
      <PromoSection>
        <PromoText>Promosyon Kodu</PromoText>
        <Toggle
          data-enabled={promoEnabled}
          onClick={() => setPromoEnabled(!promoEnabled)}
        />
      </PromoSection>
      {promoEnabled && (
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
