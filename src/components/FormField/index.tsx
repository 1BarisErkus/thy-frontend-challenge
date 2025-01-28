import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelectStore } from "../../store/useSelectStore";

const FormFieldWrapper = styled.div`
  position: relative;
  width: 200px;
  flex-grow: 1;

  @media (max-width: 1024px) {
    min-width: 200px;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #1a1f29;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  color: white;
  gap: 12px;
  height: 48px;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &:not(:disabled):hover {
    background: #2a2f39;
  }
`;

const IconWrapper = styled.span`
  color: white;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const ChevronIcon = styled(FontAwesomeIcon)<{ $isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
  color: white;
  opacity: ${(props) => (props.$isOpen ? "1" : "0.8")};
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
  font-size: 16px;
  color: #1a1f29;
  margin-bottom: 24px;
  font-weight: 500;
`;

const CounterSection = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CounterLabel = styled.span`
  font-size: 14px;
  color: #1a1f29;
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #f3f3f3;
  color: ${(props) => (props.disabled ? "#999" : "#1a1f29")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-weight: bold;

  &:hover:not(:disabled) {
    background: #e5e5e5;
  }
`;

const Count = styled.span`
  font-size: 16px;
  color: #1a1f29;
  min-width: 24px;
  text-align: center;
  font-weight: 500;
`;

const ClassSelection = styled.div`
  margin-bottom: 24px;
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
  color: #6b6b6b;

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
      border-color: #063048;

      &:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #063048;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:hover:not(:checked) {
      border-color: #063048;
    }
  }
`;

type FormFieldProps = {
  id: string;
  icon: IconDefinition;
  label: string;
  value?: string | number;
  children?: React.ReactNode;
  type?: "input" | "counter";
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
  type = "input",
  onCountChange,
}: FormFieldProps) => {
  const { openSelectId, setOpenSelectId } = useSelectStore();
  const isOpen = openSelectId === id;
  const numericValue = typeof value === "number" ? value : min;

  const handleClick = () => {
    if (id === "date") return;

    if (id === "passenger") {
      setOpenSelectId(isOpen ? null : id);
    }
  };

  const handleIncrement = () => {
    if (type === "counter" && onCountChange && numericValue < max) {
      onCountChange(numericValue + 1);
    }
  };

  const handleDecrement = () => {
    if (type === "counter" && onCountChange && numericValue > min) {
      onCountChange(numericValue - 1);
    }
  };

  return (
    <FormFieldWrapper>
      <Button onClick={handleClick} disabled={id === "date"}>
        <IconWrapper>
          <FontAwesomeIcon icon={icon} />
        </IconWrapper>
        {value || label}
        {id === "passenger" && (
          <ChevronIcon icon={faChevronDown} $isOpen={isOpen} />
        )}
      </Button>

      {(type === "counter" || children) && (
        <DropdownContainer $isOpen={isOpen}>
          {type === "counter" && (
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
                <CounterLabel>Yolcu</CounterLabel>
                <CounterContainer>
                  <CounterButton
                    onClick={handleDecrement}
                    disabled={numericValue <= min}
                  >
                    -
                  </CounterButton>
                  <Count>{numericValue}</Count>
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
          {type !== "counter" && children}
        </DropdownContainer>
      )}
    </FormFieldWrapper>
  );
};
