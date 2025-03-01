import { customRender, screen } from "../utils/test-utils";
import { Select } from "../../components/Select";
import { City } from "../../hooks/useCities";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useCities", () => ({
  useCities: () => [
    { id: "1", name: "Istanbul", country: "Turkey" },
    { id: "2", name: "Ankara", country: "Turkey" },
    { id: "3", name: "Izmir", country: "Turkey" },
  ],
}));
const mockOnChange = vi.fn();
const mockId = "test-select";
const mockPlaceholder = "Select a city";

describe("Select", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("should render component", () => {
    customRender(
      <Select
        id={mockId}
        placeholder={mockPlaceholder}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText(mockPlaceholder)).toBeInTheDocument();
  });

  it("should render component with selected value", () => {
    const selectedCity: City = { id: "1", name: "Istanbul", country: "Turkey" };

    customRender(
      <Select
        id={mockId}
        placeholder={mockPlaceholder}
        value={selectedCity}
        onChange={mockOnChange}
      />
    );

    const selectButton = screen.getByRole("button");
    expect(selectButton).toHaveTextContent(selectedCity.name);
  });

  it("should open dropdown when clicked", async () => {
    const user = userEvent.setup();
    customRender(
      <Select
        id={mockId}
        placeholder={mockPlaceholder}
        onChange={mockOnChange}
      />
    );

    expect(screen.queryByText("Ankara")).not.toBeVisible();
    await user.click(screen.getByText(mockPlaceholder));
    expect(screen.getByText("Ankara")).toBeVisible();
  });

  it("should call onChange when an option is selected", async () => {
    const user = userEvent.setup();
    customRender(
      <Select
        id={mockId}
        placeholder={mockPlaceholder}
        onChange={mockOnChange}
      />
    );

    await user.click(screen.getByText(mockPlaceholder));
    await user.click(screen.getByText("Ankara"));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      id: "2",
      name: "Ankara",
      country: "Turkey",
    });
  });

  it("should close dropdown after selecting an option", async () => {
    const user = userEvent.setup();
    customRender(
      <Select
        id={mockId}
        placeholder={mockPlaceholder}
        onChange={mockOnChange}
      />
    );

    await user.click(screen.getByText(mockPlaceholder));
    await user.click(screen.getByText("Izmir"));

    expect(screen.queryByText("Izmir")).not.toBeVisible();
  });
});
