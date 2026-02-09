import { render, screen } from "@testing-library/react";
import LoginPage from "../page";
import { useAuth } from "@/app/context/authContext";

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        replace: mockReplace,
        push: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn(),
        refresh: jest.fn(),
    }),
}));

jest.mock("../../context/authContext", () => ({
    useAuth: jest.fn(),
}));

describe("LoginPage", () => {
    it("should show a loading message when the page is loading", () => {
        useAuth.mockReturnValue({ isInitialized: false });
        render(<LoginPage />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
    it("should redirect to the home page when the user is authenticated", () => {
        useAuth.mockReturnValue({ isInitialized: true, isAuthenticated: true });
        render(<LoginPage />);
        expect(mockReplace).toHaveBeenCalledWith("/");
    });
});