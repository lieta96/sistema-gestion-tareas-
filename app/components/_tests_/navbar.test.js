import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "@/app/context/authContext";
import Navbar from "../navbar";

jest.mock("../../context/authContext", () => ({
    useAuth: jest.fn(),
}));

describe("Navbar", () => {
    it("should not render the navbar when user is not authenticated", () => {
        useAuth.mockReturnValue({ user: null, logout: jest.fn() });
        const { container } = render(<Navbar />);
        expect(container.firstChild).toBeNull();
    });

    it("should render greeting and logout button when user is authenticated", () => {
        const user = { id: 1, name: "Test User", email: "test@test.com" };
        useAuth.mockReturnValue({ user, logout: jest.fn() });
        render(<Navbar />);
        expect(screen.getByText(`Hi, ${user.name}!`)).toBeDefined();
        expect(screen.getByRole("button", { name: /logout/i })).toBeDefined();
    });

    it("should call logout when logout button is clicked", () => {
        const logout = jest.fn();
        const user = { id: 1, name: "Test User", email: "test@test.com" };
        useAuth.mockReturnValue({ user, logout: logout });
        render(<Navbar />);
        fireEvent.click(screen.getByRole("button", { name: "Logout" }));
        expect(logout).toHaveBeenCalledTimes(1);
    });
});