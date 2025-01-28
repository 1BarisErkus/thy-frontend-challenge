import styled from "styled-components";

const FlightInfoBox = styled.div`
  padding: 24px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
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
    background: #e8e8e8;
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
  color: #1c2a3a;
  margin-bottom: 4px;
`;

const AirportCode = styled.div`
  font-size: 14px;
  color: #1c2a3a;
  font-weight: 500;
`;

const CityName = styled.div`
  font-size: 12px;
  color: #687791;
`;

const DurationLabel = styled.div`
  font-size: 12px;
  color: #687791;
  margin-bottom: 4px;
`;

const DurationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Duration = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  white-space: nowrap;
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
