import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.primaryWhite};
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  position: relative;
  color: ${(props) => props.theme.colors.primaryBlue};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  color: ${(props) => props.theme.colors.primaryBlue};
  font-size: 20px;
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primaryRed};
  text-align: start;
`;

const Message = styled.p`
  margin: 0;
  line-height: 1.5;
  text-align: start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ConfirmButton = styled.button`
  background: ${(props) => props.theme.colors.primaryRed};

  &:hover {
    background: ${(props) => props.theme.colors.secondaryRed};
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export const Modal = ({ isOpen, onClose, title, message }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton onClick={onClose}>Tamam</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
