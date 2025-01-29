import styled from "styled-components";

const FlightInfoBox = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

const FlightRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 120px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateX(70%);
    width: 100px;
    height: 1px;
    background: ${(props) => props.theme.colors.primaryGray};
  }

  @media (max-width: 768px) {
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;

    &:after {
      width: 60px;
      transform: translateX(50%);
    }
  }
`;

const RoutePoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
`;

const Time = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primaryBlack};
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const AirportCode = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primaryBlack};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const CityName = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primaryGray};

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const DurationLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primaryGray};
  margin-bottom: 4px;
`;

const DurationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 12px;
  }
`;

const Duration = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryBlack};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

type FlightInfoProps = {
  departureTime: string;
  departureCode: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCode: string;
  arrivalCity: string;
  duration: string;
};

export const FlightInfo = ({
  departureTime,
  departureCode,
  departureCity,
  arrivalTime,
  arrivalCode,
  arrivalCity,
  duration,
}: FlightInfoProps) => {
  return (
    <FlightInfoBox>
      <FlightRoute>
        <RoutePoint>
          <Time>{departureTime}</Time>
          <AirportCode>{departureCode}</AirportCode>
          <CityName>{departureCity}</CityName>
        </RoutePoint>

        <RoutePoint>
          <Time>{arrivalTime}</Time>
          <AirportCode>{arrivalCode}</AirportCode>
          <CityName>{arrivalCity}</CityName>
        </RoutePoint>

        <DurationInfo>
          <DurationLabel>Uçuş Süresi</DurationLabel>
          <Duration>{duration}</Duration>
        </DurationInfo>
      </FlightRoute>
    </FlightInfoBox>
  );
};
