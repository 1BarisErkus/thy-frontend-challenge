import { customRender, screen } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { FormField } from "../../components/FormField";
import { faUser } from "@fortawesome/free-solid-svg-icons";

describe("FormField Component", () => {
  it("renders with basic props", () => {
    customRender(<FormField id="test" icon={faUser} label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders with a value instead of label when provided", () => {
    customRender(
      <FormField
        id="test"
        icon={faUser}
        label="Test Label"
        value="Test Value"
      />
    );

    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    const user = userEvent.setup();
    customRender(
      <FormField id="passenger" icon={faUser} label="Passenger" value={1} />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("Kabin ve yolcu seçimi")).toBeInTheDocument();
  });

  it('does not open dropdown when id is "date"', async () => {
    customRender(<FormField id="date" icon={faUser} label="Date" />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("increments passenger count when + button is clicked", async () => {
    const user = userEvent.setup();
    const onCountChange = vi.fn();
    customRender(
      <FormField
        id="passenger"
        icon={faUser}
        label="Passenger"
        value={1}
        onCountChange={onCountChange}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const incrementButton = screen.getByText("+");
    await user.click(incrementButton);

    expect(onCountChange).toHaveBeenCalledWith(2);
  });

  it("decrements passenger count when - button is clicked", async () => {
    const user = userEvent.setup();
    const onCountChange = vi.fn();
    customRender(
      <FormField
        id="passenger"
        icon={faUser}
        label="Passenger"
        value={2}
        onCountChange={onCountChange}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const decrementButton = screen.getByText("-");
    await user.click(decrementButton);

    expect(onCountChange).toHaveBeenCalledWith(1);
  });

  it("disables decrement button when count is at minimum", async () => {
    const user = userEvent.setup();
    customRender(
      <FormField id="passenger" icon={faUser} label="Passenger" value={1} />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const decrementButton = screen.getByText("-");
    expect(decrementButton).toBeDisabled();
  });

  it("disables increment button when count is at maximum", async () => {
    const user = userEvent.setup();
    customRender(
      <FormField id="passenger" icon={faUser} label="Passenger" value={9} />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const incrementButton = screen.getByText("+");
    expect(incrementButton).toBeDisabled();
  });

  it("renders children when provided", async () => {
    const user = userEvent.setup();
    customRender(
      <FormField id="passenger" icon={faUser} label="Passenger">
        <label>
          <input type="radio" name="class" value="economy" />
          Economy
        </label>
      </FormField>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("Economy")).toBeInTheDocument();
  });
});
