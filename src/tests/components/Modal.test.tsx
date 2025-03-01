import { customRender, screen } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Modal } from "../../components/Modal";

describe("Modal", () => {
  it("should not render component when isOpen is false", () => {
    const { container } = customRender(
      <Modal isOpen={false} onClose={vi.fn()} title="" message="" />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render component when isOpen is true", () => {
    customRender(
      <Modal isOpen={true} onClose={vi.fn()} title="Başlık" message="mesaj" />
    );

    expect(screen.getByText("Başlık")).toBeInTheDocument();
    expect(screen.getByText("mesaj")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tamam/i })).toBeInTheDocument();
  });

  it("should call onClose when clicking the close button", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    customRender(
      <Modal
        isOpen={true}
        onClose={onCloseMock}
        title="Başlık"
        message="mesaj"
      />
    );

    const closeButton = screen.getByRole("button", { name: "" });
    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking the 'Tamam' button", async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    customRender(
      <Modal
        isOpen={true}
        onClose={onCloseMock}
        title="Başlık"
        message="mesaj"
      />
    );

    const confirmButton = screen.getByRole("button", { name: /tamam/i });
    await user.click(confirmButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
