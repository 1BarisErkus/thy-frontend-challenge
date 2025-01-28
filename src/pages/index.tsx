import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { FormField } from "../components/FormField";
import { Select } from "../components/Select";
import { Modal } from "../components/Modal";
import {
  faCalendar,
  faUser,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import flightsData from "../db/flights.json";

type City = {
  id: string;
  name: string;
  country: string;
};

const MainContent = styled.main`
  background-color: #063048;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: normal;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const SearchBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 4px;
  display: flex;
  gap: 16px;
  align-items: center;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  & > * {
    @media (max-width: 1024px) {
      flex: 1 1 calc(50% - 8px);
      min-width: 200px;
    }

    @media (max-width: 768px) {
      width: 100%;
      flex: 1 1 100%;
    }
  }
`;

const SearchButton = styled.button`
  background: #e81932;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  height: 48px;
  min-width: 60px;

  &:hover {
    background: #d41730;
  }

  @media (max-width: 1024px) {
    flex: 0 0 auto !important;
    width: auto !important;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    padding: 16px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [fromCity, setFromCity] = useState<City>();
  const [toCity, setToCity] = useState<City>();
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedClass, setSelectedClass] = useState<"economy" | "business">(
    "economy"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const handleSearch = () => {
    if (!fromCity || !toCity) {
      setModalContent({
        title: "Eksik Bilgi",
        message: "Lütfen gidiş ve varış noktalarını seçiniz.",
      });
      setIsModalOpen(true);
      return;
    }
    const availableFlight = flightsData.flights.some(
      (flight) =>
        flight.originAirport.city.code === fromCity.id &&
        flight.destinationAirport.city.code === toCity.id
    );

    if (!availableFlight) {
      setModalContent({
        title: "Uçuş Bulunamadı",
        message:
          "Seçtiğiniz güzergah için uygun uçuş bulunamamıştır. Lütfen farklı bir güzergah seçiniz.",
      });
      setIsModalOpen(true);
      return;
    }

    router.push({
      pathname: "/ucus-listele",
      query: {
        from: fromCity.id,
        to: toCity.id,
        passengers: passengerCount,
        class: selectedClass,
      },
    });
  };

  return (
    <>
      <Head>
        <title>THY Frontend Challenge</title>
        <meta name="description" content="THY Frontend Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContent>
        <Title>Merhaba</Title>
        <Subtitle>Nereyi keşfetmek istersiniz?</Subtitle>

        <SearchBox>
          <Select
            id="from"
            placeholder="Nereden"
            value={fromCity}
            onChange={setFromCity}
          />

          <Select
            id="to"
            placeholder="Nereye"
            value={toCity}
            onChange={setToCity}
          />

          <FormField id="date" icon={faCalendar} label="Tarih" type="input" />

          <FormField
            id="passenger"
            icon={faUser}
            label={`${passengerCount} Yolcu`}
            value={passengerCount}
            type="counter"
            onCountChange={setPassengerCount}
          >
            <label>
              <input
                type="radio"
                name="class"
                value="economy"
                checked={selectedClass === "economy"}
                onChange={() => setSelectedClass("economy")}
              />
              Economy Class
            </label>
            <label>
              <input
                type="radio"
                name="class"
                value="business"
                checked={selectedClass === "business"}
                onChange={() => setSelectedClass("business")}
              />
              Business Class
            </label>
          </FormField>

          <SearchButton onClick={handleSearch}>
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </SearchButton>
        </SearchBox>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalContent.title}
          message={modalContent.message}
        />
      </MainContent>
    </>
  );
}
