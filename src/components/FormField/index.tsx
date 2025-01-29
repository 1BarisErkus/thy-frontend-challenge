import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FormFieldWrapper = styled.div`
  position: relative;
  width: 200px;
  flex-grow: 1;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primaryGray};
  font-size: 16px;
  height: 48px;

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #2a2f39;
  }
`;

const ChevronIcon = styled(FontAwesomeIcon)<{ $isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  z-index: 1000;
  width: 300px;
  padding: 24px;
`;

const DropdownTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryGray};
  margin-bottom: 24px;
`;

const CounterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${(props) => props.theme.colors.primaryGray};
  }
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-radius: 8px;
  width: 120px;
  justify-content: space-between;
`;

const CounterButton = styled.button<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  padding: 16px;
  border-radius: 8px;
  background: #f3f3f3;
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.primaryDisabled
      : props.theme.colors.primaryGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-weight: bold;

  span {
    color: ${(props) => props.theme.colors.primaryGray};
  }

  &:hover:not(:disabled) {
    background: #e5e5e5;
  }
`;

const ClassSelection = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.colors.primaryGray};

  input[type="radio"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #ddd;
    border-radius: 50%;
    margin: 0;
    position: relative;
    cursor: pointer;

    &:checked {
      border-color: ${(props) => props.theme.colors.primaryBlue};

      &:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${(props) => props.theme.colors.primaryBlue};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:hover:not(:checked) {
      border-color: ${(props) => props.theme.colors.primaryBlue};
    }
  }
`;

type FormFieldProps = {
  id: string;
  icon: IconDefinition;
  label: string;
  value?: string | number;
  children?: React.ReactNode;
  onCountChange?: (count: number) => void;
};

type RadioLabelProps = {
  children: React.ReactNode;
  type: string;
};

const min = 1;
const max = 9;

export const FormField = ({
  id,
  icon,
  label,
  value,
  children,
  onCountChange,
}: FormFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const numericValue = typeof value === "number" ? value : min;

  const handleClick = () => {
    if (id === "date") return;
    setIsOpen(!isOpen);
  };

  const handleIncrement = () => {
    if (id === "passenger" && onCountChange && numericValue < max) {
      onCountChange(numericValue + 1);
    }
  };

  const handleDecrement = () => {
    if (id === "passenger" && onCountChange && numericValue > min) {
      onCountChange(numericValue - 1);
    }
  };

  return (
    <FormFieldWrapper>
      <Button onClick={handleClick} disabled={id === "date"}>
        <FontAwesomeIcon icon={icon} />
        {value || label}
        {id === "passenger" && (
          <ChevronIcon icon={faChevronDown} $isOpen={isOpen} />
        )}
      </Button>

      {(id === "passenger" || children) && (
        <DropdownContainer $isOpen={isOpen}>
          {id === "passenger" && (
            <>
              <DropdownTitle>Kabin ve yolcu seçimi</DropdownTitle>
              <ClassSelection>
                {React.Children.map(children, (child) => {
                  if (
                    React.isValidElement<RadioLabelProps>(child) &&
                    child.type === "label"
                  ) {
                    return <RadioLabel>{child.props.children}</RadioLabel>;
                  }
                  return child;
                })}
              </ClassSelection>
              <CounterSection>
                <span>Yolcu</span>
                <CounterContainer>
                  <CounterButton
                    onClick={handleDecrement}
                    disabled={numericValue <= min}
                  >
                    -
                  </CounterButton>
                  <span>{numericValue}</span>
                  <CounterButton
                    onClick={handleIncrement}
                    disabled={numericValue >= max}
                  >
                    +
                  </CounterButton>
                </CounterContainer>
              </CounterSection>
            </>
          )}
          {id !== "passenger" && children}
        </DropdownContainer>
      )}
    </FormFieldWrapper>
  );
};
