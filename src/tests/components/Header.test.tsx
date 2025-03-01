import { customRender, screen } from "../utils/test-utils";
import { Header } from "../../components/Header";

describe("Header", () => {
  it("should render component", () => {
    customRender(<Header $isBlueBackground={true} />);
    expect(screen.getByText("Flight Challenge")).toBeInTheDocument();
  });
});
