import { tasksService } from "@/app/services/tasksService";
import { mockToken } from "@/app/mocks/auth";

describe("tasksService", () => {
    it("should return all tasks when getTasks is called", async () => {
        const tasks = await tasksService.getTasks(mockToken);
        expect(tasks.length).toBe(4);
    });
    it("should throw 'Unauthorized' when getTasks is called without a token", async () => {
        await expect(tasksService.getTasks(null)).rejects.toThrow("Unauthorized");
    });
    it("should throw 'Unauthorized' when addTask is called without a token", async () => {
        const mockTask = {
            id: 5,
            title: "Test Task",
            description: "Test Description",
            status: "To Do",
        };
        await expect(tasksService.addTask(mockTask, null)).rejects.toThrow("Unauthorized");
    });
    it("should throw 'Unauthorized' when updateTask is called without a token", async () => {
        const mockTask = {
            id: 1,
            title: "Test Task",
            description: "Test Description",
            status: "To Do",
        };
        await expect(tasksService.updateTask(mockTask, null)).rejects.toThrow("Unauthorized");
    });
    it("should throw 'Unauthorized' when deleteTask is called without a token", async () => {
        await expect(tasksService.deleteTask(1, null)).rejects.toThrow("Unauthorized");
    });
    it("should add a task when addTask is called", async () => {
        const tasksBefore = await tasksService.getTasks(mockToken);
        const mockTask = {
            id: 5,
            title: "Test Task",
            description: "Test Description",
            status: "To Do",
        };
        const task = await tasksService.addTask(mockTask, mockToken);
        expect(task.id).toBe(tasksBefore.length + 1);
    });
    it("should update a task when updateTask is called", async () => {
        const mockTask = {
            id: 1,
            title: "Test Task",
            description: "Test Description",
            status: "To Do",
        };
        const task = await tasksService.updateTask(mockTask, mockToken);
        expect(task).toBeDefined();
        expect(task.status).toBe("To Do");
    });
    it("should delete a task when deleteTask is called", async () => {
        const tasksBefore = await tasksService.getTasks(mockToken);
        await tasksService.deleteTask(1, mockToken);
        const tasksAfter = await tasksService.getTasks(mockToken);
        expect(tasksAfter.length).toBe(tasksBefore.length - 1);
        expect(tasksAfter.find((t) => t.id === 1)).toBeUndefined();
    });
});