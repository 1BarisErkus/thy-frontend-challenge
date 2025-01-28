import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FareBoxContainer = styled.div`
  padding: 24px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  position: relative;
  cursor: pointer;
`;

const ArrowIcon = styled.div<{ isSelected: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #687791;
  transition: all 0.2s ease;
`;

const FareType = styled.div`
  font-size: 12px;
  color: #687791;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid #687791;
    border-radius: 50%;
    display: inline-block;
  }
`;

const FarePrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PriceLabel = styled.div`
  font-size: 12px;
  color: #687791;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1c2a3a;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

type FareBoxProps = {
  type: "ECONOMY" | "BUSINESS";
  amount: number;
  isSelected: boolean;
  onSelect: () => void;
};

export const FareBox = ({
  type,
  amount,
  isSelected,
  onSelect,
}: FareBoxProps) => {
  return (
    <FareBoxContainer onClick={onSelect}>
      <FareType>{type.toLowerCase()}</FareType>
      <FarePrice>
        <PriceLabel>Yolcu Başına</PriceLabel>
        <Price>TRY {amount.toFixed(2)}</Price>
      </FarePrice>
      <ArrowIcon isSelected={isSelected}>
        <FontAwesomeIcon icon={isSelected ? faChevronUp : faChevronDown} />
      </ArrowIcon>
    </FareBoxContainer>
  );
};
