import Head from "next/head";
import styled from "styled-components";
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
import { useFormStore } from "@/store/useFormStore";
import { useFlights } from "@/hooks/useFlights";

const MainContent = styled.main`
  background-color: ${(props) => props.theme.colors.primaryBlue};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  text-align: center;

  h1 {
    font-weight: normal;
  }

  h2 {
    font-weight: normal;
    margin-bottom: 40px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  & > * {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const SearchButton = styled.button`
  background: ${(props) => props.theme.colors.primaryRed};
  height: 48px;

  &:hover {
    background: ${(props) => props.theme.colors.secondaryRed};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.primaryGray};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function Home() {
  const router = useRouter();
  const {
    fromCity,
    toCity,
    passengerCount,
    selectedClass,
    isModalOpen,
    modalContent,
    setFromCity,
    setToCity,
    setPassengerCount,
    setSelectedClass,
    setIsModalOpen,
    setModalContent,
  } = useFormStore();

  const { flights: flightsData, loading: flightsLoading } = useFlights(
    fromCity?.id,
    toCity?.id
  );

  const handleSearch = () => {
    if (!fromCity || !toCity) {
      setModalContent({
        title: "Eksik Bilgi",
        message: "Lütfen gidiş ve varış noktalarını seçiniz.",
      });
      setIsModalOpen(true);
      return;
    }

    const availableFlight = flightsData.length > 0;

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
      </Head>

      <MainContent>
        <h1>Merhaba</h1>
        <h2>Nereyi keşfetmek istersiniz?</h2>

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

          <FormField id="date" icon={faCalendar} label="Tarih" />

          <FormField
            id="passenger"
            icon={faUser}
            label={`${passengerCount} Yolcu`}
            value={passengerCount}
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

          <SearchButton onClick={handleSearch} disabled={flightsLoading}>
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
