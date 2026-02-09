import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewTask from "../newTask";
import { mockToken } from "@/app/mocks/auth";


describe("NewTask", () => {
   
    it("should not create a new task when the form is submitted with an empty title", async () => {
        const user = userEvent.setup();
        const tasks = [];
        const dispatchTasks = jest.fn();
        render(<NewTask token={mockToken} tasks={tasks} dispatchTasks={dispatchTasks} />);
        await user.click(screen.getByRole("button", { name: "Create" }));
        expect(dispatchTasks).not.toHaveBeenCalled();
        expect(screen.getByText("Title is required")).toBeDefined();
    });
});