import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FareBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
`;

const FareHeader = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.$isSelected
      ? props.theme.colors.secondaryWhite
      : props.theme.colors.primaryWhite};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  height: 100%;
  min-height: 72px;

  &:hover {
    background: ${(props) => props.theme.colors.secondaryWhite};
  }
`;

const RadioButton = styled.div<{ $isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.primaryRed
        : props.theme.colors.primaryGray};
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;

  &:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.$isSelected ? 1 : 0)};
  }
`;

const FareInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FareType = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primaryGray};
  font-weight: 400;
  text-transform: uppercase;
`;

const OnePassegerAmount = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primaryGray};
  font-weight: 400;
`;

const FareAmount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: ${(props) => props.theme.colors.primaryBlack};

  span {
    font-size: 16px;
    font-weight: 600;
  }
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
    <FareBoxContainer>
      <FareHeader $isSelected={isSelected} onClick={onSelect}>
        <RadioButton $isSelected={isSelected} />
        <FareInfo>
          <FareType>{type}</FareType>
          <OnePassegerAmount>
            Yolcu Başına
            <FareAmount>
              <span className="currency">TRY</span>
              <span className="amount">{amount.toFixed(2)}</span>
            </FareAmount>
          </OnePassegerAmount>
        </FareInfo>
        <FontAwesomeIcon
          icon={isSelected ? faChevronUp : faChevronDown}
          color="#687791"
          size="sm"
        />
      </FareHeader>
    </FareBoxContainer>
  );
};
