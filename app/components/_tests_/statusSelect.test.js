import { render, screen } from "@testing-library/react";
import { StatusSelect } from "../statusSelect";
describe("StatusSelect", () => {
    it("should render the status select with the correct status", () => {
        render(<StatusSelect value="To Do" onChange={jest.fn()} />);
        expect(screen.getByRole("button", { name: "Status" })).toHaveTextContent("To Do");
    });
    
});