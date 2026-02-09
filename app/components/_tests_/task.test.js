import { render, screen } from "@testing-library/react";
import { Task } from "../task";
import { useAuth } from "../../context/authContext";
import { tasksService } from "../../services/tasksService";
import userEvent from "@testing-library/user-event";

jest.mock("../../context/authContext", () => ({
    useAuth: jest.fn(),
}));
jest.mock("../../services/tasksService", () => ({
    tasksService: {
        deleteTask: jest.fn(),
        updateTask: jest.fn(),
    },
}));
describe("Task", () => {
    it("should render the task with the correct title and description", () => {
        useAuth.mockReturnValue({ token: "mock-token" });
        render(
            <Task
                task={{ id: 1, title: "Test Task", description: "Test Description", status: "To Do" }}
                dispatchTasks={jest.fn()}
            />
        );
        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
    it("should call tasksService.deleteTask when the delete button is clicked", async () => {
        const user = userEvent.setup();
        tasksService.deleteTask.mockResolvedValue(undefined);

        render(
            <Task
                task={{ id: 1, title: "Test Task", description: "Test Description", status: "To Do" }}
                dispatchTasks={jest.fn()}
            />
        );
        await user.click(screen.getByRole("button", { name: "Delete task" }));
        expect(tasksService.deleteTask).toHaveBeenCalledTimes(1);
    });

});