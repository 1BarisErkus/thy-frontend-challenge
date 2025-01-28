import styled from "styled-components";
import citiesData from "../../db/cities.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelectStore } from "../../store/useSelectStore";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 250px;
`;

const SelectButton = styled.button`
  width: 100%;
  background: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  color: #666;
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

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const CityName = styled.span`
  color: #333;
`;

const CountryName = styled.span`
  color: #666;
  font-size: 14px;
`;

type City = {
  id: string;
  name: string;
  country: string;
};

type SelectProps = {
  id: string;
  placeholder: string;
  value?: City;
  onChange: (city: City) => void;
};

export const Select = ({ id, placeholder, value, onChange }: SelectProps) => {
  const { openSelectId, setOpenSelectId } = useSelectStore();
  const isOpen = openSelectId === id;
  const cities = citiesData.cities;

  const handleSelect = (city: City) => {
    onChange(city);
    setOpenSelectId(null);
  };

  const handleClick = () => {
    setOpenSelectId(isOpen ? null : id);
  };

  return (
    <SelectWrapper id={`select-${id}`}>
      <SelectButton onClick={handleClick}>
        <IconWrapper>
          <FontAwesomeIcon icon={faPlane} />
        </IconWrapper>
        {value ? value.name : placeholder}
        <ChevronIcon icon={faChevronDown} $isOpen={isOpen} />
      </SelectButton>

      <DropdownContainer $isOpen={isOpen}>
        {cities.map((city) => (
          <CityOption key={city.id} onClick={() => handleSelect(city)}>
            <CityName>{city.name}</CityName>
            <CountryName>{city.country}</CountryName>
          </CityOption>
        ))}
      </DropdownContainer>
    </SelectWrapper>
  );
};
