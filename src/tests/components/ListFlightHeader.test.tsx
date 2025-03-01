import { customRender, screen } from "../utils/test-utils";
import { ListFlightHeader } from "../../components/ListFlightHeader";
import { vi, beforeEach } from "vitest";

let mockIsEnabled = false;
const mockTogglePromoEnabled = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { from: "Istanbul", to: "Antalya", passengers: "1" },
  }),
}));

vi.mock("../../hooks/usePromoEnabled", () => ({
  usePromoEnabled: () => ({
    isEnabled: mockIsEnabled,
    togglePromoEnabled: mockTogglePromoEnabled,
  }),
}));

describe("ListFlightHeader", () => {
  beforeEach(() => {
    mockIsEnabled = false;
    mockTogglePromoEnabled.mockClear();
  });

  it("should render component when isEnabled is false", () => {
    mockIsEnabled = false;
    customRender(<ListFlightHeader />);

    expect(screen.getByText("Istanbul - Antalya, 1 Yolcu")).toBeInTheDocument();
    expect(
      screen.queryByText(/Promosyon Kodu seçeneği aktifken Eco Fly paketi/)
    ).not.toBeInTheDocument();
  });

  it("should render component when isEnabled is true", () => {
    mockIsEnabled = true;
    customRender(<ListFlightHeader />);

    expect(
      screen.getByText(/Promosyon Kodu seçeneği aktifken Eco Fly paketi/)
    ).toBeInTheDocument();
  });
});
