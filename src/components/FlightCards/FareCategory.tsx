import styled from "styled-components";

const CategoryContainer = styled.div`
  background: ${(props) => props.theme.colors.primaryWhite};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const CategoryName = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.secondaryGray};
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryGray};
`;

const CategoryPrice = styled.div<{ $hasDiscount?: boolean }>`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primaryBlack};
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .original-price {
    text-decoration: line-through;
    color: ${(props) => props.theme.colors.primaryGray};
    font-size: 14px;
  }

  .currency {
    font-size: 14px;
    color: ${(props) => props.theme.colors.primaryGray};
    margin-left: 4px;
  }
`;

const RightItem = styled.li`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primaryGray};
  padding: 4px 0;
`;

const SelectButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  background: ${(props) =>
    props.$disabled
      ? props.theme.colors.primaryDisabled
      : props.theme.colors.primaryRed};
  color: white;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};

  &:hover {
    background: ${(props) =>
      props.$disabled
        ? props.theme.colors.primaryDisabled
        : props.theme.colors.secondaryRed};
  }
`;

interface FareCategoryProps {
  brandCode: string;
  price: number;
  originalPrice?: number;
  rights: string[];
  isDisabled: boolean;
  onSelect: () => void;
}

export const FareCategory = ({
  brandCode,
  price,
  originalPrice,
  rights,
  isDisabled,
  onSelect,
}: FareCategoryProps) => {
  const hasDiscount = originalPrice !== undefined && originalPrice !== price;

  return (
    <CategoryContainer>
      <CategoryName>{brandCode}</CategoryName>
      <CategoryPrice $hasDiscount={hasDiscount}>
        {hasDiscount && (
          <span className="original-price">
            {originalPrice?.toFixed(2)}
            <span className="currency">TRY</span>
          </span>
        )}
        <span>
          {price.toFixed(2)}
          <span className="currency">TRY</span>
        </span>
      </CategoryPrice>
      <ul>
        {rights.map((right, rightIndex) => (
          <RightItem key={rightIndex}>{right}</RightItem>
        ))}
      </ul>
      <SelectButton
        onClick={onSelect}
        disabled={isDisabled}
        $disabled={isDisabled}
      >
        Uçuşu seç
      </SelectButton>
    </CategoryContainer>
  );
};
