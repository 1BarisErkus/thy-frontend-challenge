import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useCities, City } from "../../hooks/useCities";
import { useState } from "react";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 250px;
`;

const SelectButton = styled.button`
  width: 100%;
  background: white;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primaryGray};
`;

const ChevronIcon = styled(FontAwesomeIcon)<{ $isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  min-width: 250px;
  width: 100%;
`;

const CityOption = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  span {
    color: ${(props) => props.theme.colors.secondaryGray};
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

type SelectProps = {
  id: string;
  placeholder: string;
  value?: City;
  onChange: (city: City) => void;
};

export const Select = ({ id, placeholder, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cities = useCities();

  const handleSelect = (city: City) => {
    onChange(city);
    setIsOpen(false);
  };

  return (
    <SelectWrapper id={`select-${id}`}>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        <span>
          <FontAwesomeIcon icon={faPlane} />
        </span>
        {value ? value.name : placeholder}
        <ChevronIcon icon={faChevronDown} $isOpen={isOpen} />
      </SelectButton>

      <DropdownContainer $isOpen={isOpen}>
        {cities.map((city) => (
          <CityOption key={city.id} onClick={() => handleSelect(city)}>
            <span>{city.name}</span>
            <span>{city.country}</span>
          </CityOption>
        ))}
      </DropdownContainer>
    </SelectWrapper>
  );
};
